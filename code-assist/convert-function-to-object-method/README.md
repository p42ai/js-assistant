## Improvements
- Support arrow functions without `this` (warn if there is `this` present):
  ```
    generateFileBasedTestSuite({
    testFileSuffix: ".spec",
    generateTest: async (testCase, content) => {
      const testSpec = parseAugmentationTestSpec(content);

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
  ```
- Support named functions when the function name is not referenced (and inform user)
- Support