import * as _ from "lodash";
import { CoreAugmentations } from "../../augmentation/CoreAugmentations";
import { CodeAssistType } from "../../code-assist/CodeAssistType";
import { FixedContent } from "../../code-assist/Content";
import { SourceDocumentFactory } from "../../code-assist/SourceDocumentFactory";
import { generateFileBasedTestSuite } from "../../test/generateFileBasedTestSuite";
import { InteractiveInput } from "../../transformation/InteractiveInput";
import { Range } from "../../util/text/Range";
import { CodeAssist } from "../CodeAssist";
import { splitCodeAssistId } from "../CodeAssistId";
import { codeAssistLevelToString, Suggestion } from "../CodeAssistLevel";
import { EditorAction } from "../editor-action/EditorAction";
import { parseCodeAssistTestSpecification } from "./parseCodeAssistTestSpecification";

export function generateCodeAssistTestSuite(
  codeAssistType: CodeAssistType<any>
) {
  generateFileBasedTestSuite({
    testFileSuffix: ".test.md",
    generateTest: async (testCase, content) => {
      const specification = parseCodeAssistTestSpecification(content);

      const { input } = specification;
      const expectedOutput =
        specification.expectedOutput ?? specification.input;

      const sourceDocumentFactory = new SourceDocumentFactory(
        CoreAugmentations.concat(codeAssistType.matcher.requiredAugmentations),
        [codeAssistType]
      );

      const sourceDocument = await sourceDocumentFactory.createSourceDocument({
        content: new FixedContent(
          testCase,
          specification.configuration.extension,
          input
        ),
      });

      const { configuration } = specification;
      const onlySuggestions = configuration?.onlySuggestions === true;

      let codeAssists: Array<CodeAssist>;
      let errors: Array<unknown>;

      if (configuration?.selection != null) {
        const result = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [codeAssistType.id],
          range: Range.parse(configuration.selection),
        });
        errors = result.errors;
        codeAssists = result.codeAssists.filter(
          (selectionCodeAssist) =>
            !onlySuggestions || selectionCodeAssist.level === Suggestion
        );
      } else if (onlySuggestions) {
        const result = await sourceDocument.getSuggestedCodeAssists({
          codeAssistTypeIds: [codeAssistType.id],
        });
        errors = result.errors;
        codeAssists = result.codeAssists;
      } else {
        const result = await sourceDocument.getBasicCodeAssists([
          codeAssistType.id,
        ]);
        errors = result.errors;
        codeAssists = result.codeAssists;
      }

      expect(errors).toEqual([]);

      if (configuration?.transformedNodeId != null) {
        const transformedNodeId = configuration?.transformedNodeId;

        codeAssists = codeAssists.filter(
          (codeAssist) =>
            splitCodeAssistId(codeAssist.id).matchedNodeId === transformedNodeId
        );
      }

      if (configuration?.transformationId != null) {
        const transformationId = configuration?.transformationId;

        codeAssists = codeAssists.filter(
          (codeAssist) =>
            splitCodeAssistId(codeAssist.id).transformationId ===
            transformationId
        );
      }

      const interactiveInput: InteractiveInput = {
        selectOption(request) {
          return Promise.resolve(
            configuration.interactiveInput?.selectOption?.return
          );
        },
      };

      const { edit, applicationResults } =
        await sourceDocument.applyCodeAssists({
          codeAssists,
          interactiveInput,
        });

      // check all application results
      for (const applicationResult of applicationResults) {
        const { codeAssistId } = applicationResult;
        const { matchedNodeId } = splitCodeAssistId(codeAssistId);

        const expectedResult =
          specification.expectedMatches?.[matchedNodeId]?.applicationResult ??
          "applied"; // expect successful application by default

        expect(applicationResult).toEqual({
          codeAssistId, // included for easier test debugging
          result: expectedResult,
        });
      }

      // check expected matches values:
      if (specification.expectedMatches != null) {
        const matchedNodeIds = codeAssists.map(
          (codeAssist) => splitCodeAssistId(codeAssist.id).matchedNodeId
        );

        for (const entry of Object.entries(specification.expectedMatches)) {
          const nodeId = entry[0];
          const expected = entry[1];

          let codeAssist = codeAssists.find(
            (codeAssist) =>
              splitCodeAssistId(codeAssist.id).matchedNodeId === nodeId
          );

          if (expected === null) {
            expect(codeAssist).toBeUndefined();
            continue;
          }

          expect(matchedNodeIds).toContain(nodeId); // for easier debugging
          expect(codeAssist).toBeDefined();
          codeAssist = codeAssist!;

          if (expected.safety != null) {
            expect(codeAssist.safety).toEqual(expected.safety);
          }

          if (expected.suggestion != null) {
            const suggestion = sourceDocument.getSuggestion(codeAssist.id);

            expect(suggestion).toBeDefined();

            if (expected.suggestion.description != null) {
              expect(suggestion!.description).toEqual(
                expected.suggestion.description
              );
            }

            if (expected.suggestion.highlightRanges != null) {
              const actualHighlightRanges = suggestion!.highlightRanges.map(
                (range) => range.toString()
              );
              expect(actualHighlightRanges).toBeDefined();
              expect(actualHighlightRanges).toEqual(
                expected.suggestion.highlightRanges
              );
            }
          } else if (expected.suggestion === null) {
            expect(sourceDocument.getSuggestion(codeAssist.id)).toBeUndefined();
          }

          if (expected.actionZones != null) {
            const actualActionZones = sourceDocument
              .getActionZones(codeAssist.id)
              ?.map((zone) => ({
                range: zone.range.toString(),
                kind: codeAssistType.getCodeActionKind(
                  zone.codeActionKindIndex
                ),
                label: zone.label,
                level: codeAssistLevelToString.get(zone.level),
              }));

            expect(actualActionZones).toBeDefined();
            expect(actualActionZones?.length).toEqual(
              expected.actionZones.length
            );

            expect(
              // only compare available expected keys:
              actualActionZones?.map((zone, index) =>
                _.pick(zone, ...Object.keys(expected.actionZones![index]))
              )
            ).toEqual(expected.actionZones);
          }

          if (expected.blockedZones != null) {
            const actualBlockedZones = sourceDocument.getBlockedZones(
              codeAssist.id
            );

            expect(
              actualBlockedZones?.map((zone) => ({
                range: zone.range.toString(),
                kind: zone.kind,
              }))
            ).toEqual(expected.blockedZones);
          }

          if (expected.availableTransformations != null) {
            expect(
              codeAssists
                .filter(
                  (codeAssist) =>
                    splitCodeAssistId(codeAssist.id).matchedNodeId === nodeId
                )
                .map(
                  (codeAssist) =>
                    splitCodeAssistId(codeAssist.id).transformationId
                )
            ).toStrictEqual(expected.availableTransformations);
          }

          const { postEditActions } = expected;
          if (postEditActions != null) {
            for (let i = 0; i < postEditActions.length; i++) {
              const expectedPostEditAction = postEditActions[i];
              const embeddedSourceId = "0"; // TODO make configurable in test
              const postEditAction = (
                await sourceDocument.getCodeAssistAction({
                  codeAssistId: `${embeddedSourceId}:${
                    codeAssistType.id
                  }:${nodeId}:${configuration?.transformationId ?? ""}`,
                  interactiveInput,
                })
              ).postEditActions?.[i];

              expect(convertEditorActionToTestFormat(postEditAction)).toEqual(
                expectedPostEditAction
              );
            }
          }
        }
      }

      expect(sourceDocument.applyEdit(edit)).toEqual(expectedOutput);
    },
  });
}

function convertEditorActionToTestFormat(action: EditorAction | undefined) {
  switch (action?.type) {
    case "HIGHLIGHT":
      return {
        type: "HIGHLIGHT",
        highlights: action.highlights.map((range) => range.toString()),
      };
    case "SELECT":
      return {
        type: "SELECT",
        selections: action.selections.map((range) => range.toString()),
      };
    default:
      return action;
  }
}
