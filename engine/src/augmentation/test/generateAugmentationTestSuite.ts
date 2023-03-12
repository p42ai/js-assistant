import * as _ from "lodash";
import ts from "typescript";
import { findNodeById } from "../../ast/findNodeById";
import { getId } from "../../ast/getId";
import { Augmentation } from "../../augmentation/Augmentation";
import { CoreAugmentations } from "../../augmentation/CoreAugmentations";
import { createParseAndAugmentFunction } from "../../augmentation/createParseAndAugmentFunction";
import { MatchAugmentation } from "../../augmentation/MatchAugmentation";
import { Binding } from "../../augmentation/scope/Binding";
import { AnyMatch } from "../../matcher/engine/Match";
import { generateFileBasedTestSuite } from "../../test/generateFileBasedTestSuite";
import { parseAugmentationTestSpecification } from "./parseAugmentationTestSpecification";

const testValue = (actualValue: any, expectedValue: any) => {
  expect(actualValue).toBeDefined();

  if (expectedValue.type === "Binding") {
    expect(actualValue instanceof Binding).toStrictEqual(true);
    const actualBinding = actualValue as Binding;
    expect(getId(actualBinding.scope.node)).toStrictEqual(
      expectedValue.scope ?? undefined // convert null to undefined for global scope
    );
    expect(actualBinding.name).toStrictEqual(expectedValue.name);
  } else if (_.isInteger(actualValue.kind)) {
    // duck typing: if value has kind, assume it's a node. Not type-safe
    const actualNode = actualValue as ts.Node;

    expect(getId(actualNode)).toStrictEqual(expectedValue);
  } else {
    expect(actualValue).toStrictEqual(expectedValue);
  }
};

export function generateAugmentationTestSuite(
  augmentation: Augmentation<unknown>
) {
  const parseAndAugment = createParseAndAugmentFunction(
    CoreAugmentations.concat(
      augmentation instanceof MatchAugmentation
        ? augmentation.requiredAugmentations
        : []
    ).concat([augmentation])
  );

  generateFileBasedTestSuite({
    testFileSuffix: ".test.md",
    generateTest: async (testCase, content) => {
      const testSpec = parseAugmentationTestSpecification(content);

      const { sourceFile, context } = await parseAndAugment(testSpec.input);

      // for every key from expected augmentations: find node
      const expectedAugmentations = Object.entries(
        testSpec.expectedAugmentations
      );
      for (const [nodeId, expectation] of expectedAugmentations) {
        const node = findNodeById(sourceFile, nodeId);

        if (node == null) {
          throw `node ${nodeId} not found`;
        }

        const match = augmentation.getValue(node, context) as AnyMatch;

        // matched:
        expect(match != null).toStrictEqual(expectation.match);

        // captures:
        _.forEach(expectation.captures, (expectedValue, key) => {
          testValue(match.captures[key], expectedValue);
        });

        // data:
        _.forEach(expectation.data, (expectedValue, key) => {
          testValue(match.data[key], expectedValue);
        });
      }
    },
  });
}
