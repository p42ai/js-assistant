import ts from "typescript";
import { CodeAssistLevel, NodeRange } from "..";
import { CoreAugmentations } from "../augmentation/CoreAugmentations";
import { AnyMatch } from "../matcher/engine/Match";
import { Edit } from "../transformation/reprinter/Edit";
import { Safety } from "../transformation/safety/Safety";
import { Range } from "../util/text/Range";
import { QuickFix, Regular } from "./CodeAssistLevel";
import { CodeAssistType } from "./CodeAssistType";
import { FixedContent } from "./Content";
import { SourceDocument } from "./SourceDocument";
import { SourceDocumentFactory } from "./SourceDocumentFactory";
import { BlockCodeAssist, BlockTransformation } from "./test/BlockCodeAssist";
import { createMockActionZone } from "./test/createMockActionZone";
import {
  IdentifierCodeAssist,
  IdentifierMatcher,
  IdentifierTransformation,
} from "./test/IdentifierCodeAssist";
import {
  MockCodeAssist,
  MockMatcher,
  MockTransformation,
} from "./test/MockCodeAssist";

async function createSourceDocument(
  filename: string,
  text: string,
  codeAssistTypes: Array<CodeAssistType<AnyMatch>>
): Promise<SourceDocument> {
  const factory = new SourceDocumentFactory(CoreAugmentations, codeAssistTypes);
  return factory.createSourceDocument({
    content: new FixedContent(filename, undefined, text),
  });
}

describe("SourceDocument", () => {
  describe("getLineCount", () => {
    it("should return 1 for a single-line file", async () => {
      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        []
      );

      expect(sourceDocument.getLineCount()).toEqual(1);
    });

    it("should return correct count for a multi-line file", async () => {
      const sourceDocument = await createSourceDocument(
        "file.js",
        `
anObject.doSomething();
`,
        []
      );

      expect(sourceDocument.getLineCount()).toEqual(3);
    });
  });

  describe("applyCodeAssistsById", () => {
    it("should apply a single code assist in a single embedded range", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: [codeAssists[0].id],
      });

      expect(result).toEqual({
        edit: new Edit(new Range(0, 7), "replacemen"),
        applicationResults: [
          {
            codeAssistId: codeAssists[0].id,
            result: "applied",
          },
        ],
      });
    });

    it("should apply a single code assist in a single embedded range that is shifted", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "test.vue",
        `
<template>some text</template>
<script>
anObject.doSomething();
</script>
`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: [codeAssists[0].id],
      });

      expect(result).toEqual({
        edit: new Edit(new Range(41, 48), "replacemen"),
        applicationResults: [
          {
            codeAssistId: codeAssists[0].id,
            result: "applied",
          },
        ],
      });
    });

    it("should apply two code assist in a single embedded range", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: codeAssists.map((codeAssist) => codeAssist.id),
      });

      expect(result).toEqual({
        edit: new Edit(new Range(0, 20), "replacement.replacement"),
        applicationResults: [
          {
            codeAssistId: codeAssists[0].id,
            result: "applied",
          },
          {
            codeAssistId: codeAssists[1].id,
            result: "applied",
          },
        ],
      });
    });

    it("should apply three code assist in a two separate embedded range", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "test.vue",
        `
<script>
anObject.doSomething();
</script>
<script setup>
doSomethingElse();
</script>
`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: codeAssists.map((codeAssist) => codeAssist.id),
      });

      expect(result).toEqual({
        edit: new Edit(
          new Range(10, 74),
          `replacement.replacement();
</script>
<script setup>
replacement`
        ),
        applicationResults: [
          {
            codeAssistId: codeAssists[0].id,
            result: "applied",
          },
          {
            codeAssistId: codeAssists[1].id,
            result: "applied",
          },
          {
            codeAssistId: codeAssists[2].id,
            result: "applied",
          },
        ],
      });
    });

    it("should only apply outer code assist and return conflict for inner code assist", async () => {
      const types = [new BlockCodeAssist({})];

      const sourceDocument = await createSourceDocument(
        "file.js",
        `{ {  } }`,
        types
      );

      const { codeAssists } = await sourceDocument.getBasicCodeAssists(
        types.map((type) => type.id)
      );

      const result = await sourceDocument.applyCodeAssists({
        codeAssists,
      });

      expect(result).toEqual({
        edit: new Edit(new Range(2, 2), "inserted;\n "),
        applicationResults: [
          {
            codeAssistId: codeAssists[0].id,
            result: "applied",
          },
          {
            codeAssistId: codeAssists[1].id,
            result: "rejected/conflict",
          },
        ],
      });
    });

    it("should apply code assist for node closer to root first", async () => {
      const type = new MockCodeAssist({
        matcher: new MockMatcher(["0-8-Block", "1-6-Block"]),
      });

      const sourceDocument = await createSourceDocument("file.js", `{ {  } }`, [
        type,
      ]);

      await sourceDocument.getBasicCodeAssists([type.id]);

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: [
          "0:mock:1-6-Block:", // leaf code assist first to check sorting
          "0:mock:0-8-Block:",
        ],
      });

      expect(result).toEqual({
        edit: undefined,
        applicationResults: [
          {
            codeAssistId: "0:mock:0-8-Block:",
            result: "applied",
          },
          {
            codeAssistId: "0:mock:1-6-Block:",
            result: "rejected/conflict",
          },
        ],
      });
    });

    it("should apply code assist for node on same level with earlier start first", async () => {
      const type = new MockCodeAssist({
        matcher: new MockMatcher(["0-3-Identifier", "4-8-Identifier"]),
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `id1; id2;`,
        [type]
      );

      await sourceDocument.getBasicCodeAssists([type.id]);

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: [
          "0:mock:4-8-Identifier:", // later code assist first to check sorting
          "0:mock:0-3-Identifier:",
        ],
      });

      expect(result).toEqual({
        edit: undefined,
        applicationResults: [
          {
            codeAssistId: "0:mock:0-3-Identifier:",
            result: "applied",
          },
          {
            codeAssistId: "0:mock:4-8-Identifier:",
            result: "applied",
          },
        ],
      });
    });

    it("should apply code assist with multiple impact nodes only on first impact node", async () => {
      const type = new MockCodeAssist({
        matcher: new MockMatcher(["4-8-Identifier"]),
        transformations: [
          new MockTransformation({
            impactNodes: new Map([
              ["4-8-Identifier", ["0-3-Identifier", "4-8-Identifier"]],
            ]),
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `id1; id2;`,
        [type]
      );

      await sourceDocument.getBasicCodeAssists([type.id]);

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: ["0:mock:4-8-Identifier:"],
      });

      expect(result).toEqual({
        edit: undefined,
        applicationResults: [
          {
            codeAssistId: "0:mock:4-8-Identifier:",
            result: "applied",
          },
        ],
      });
    });

    it("should apply first code assist type and reject other code assists for the same node", async () => {
      const types = [
        new MockCodeAssist({
          id: "mock-0",
          matcher: new MockMatcher(["4-8-Identifier"]),
        }),
        new MockCodeAssist({
          id: "mock-1",
          matcher: new MockMatcher(["4-8-Identifier"]),
        }),
      ];

      const sourceDocument = await createSourceDocument(
        "file.js",
        `id1; id2;`,
        types
      );

      await sourceDocument.getBasicCodeAssists(types.map((type) => type.id));

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: [
          "0:mock-1:4-8-Identifier:",
          "0:mock-0:4-8-Identifier:", // inverted order to test sorting
        ],
      });

      expect(result).toEqual({
        edit: undefined,
        applicationResults: [
          {
            codeAssistId: "0:mock-0:4-8-Identifier:",
            result: "applied",
          },
          {
            codeAssistId: "0:mock-1:4-8-Identifier:",
            result: "rejected/conflict",
          },
        ],
      });
    });

    it("should apply first code assist type and reject other code assists for child nodes", async () => {
      const types = [
        new MockCodeAssist({
          id: "mock-0",
          matcher: new MockMatcher(["0-3-ExpressionStatement"]),
          transformations: [
            new MockTransformation({
              impactNodes: new Map([
                [
                  "0-3-ExpressionStatement",
                  ["0-3-ExpressionStatement", "18-21-Identifier"],
                ],
              ]),
            }),
          ],
        }),
        new MockCodeAssist({
          id: "mock-1",
          matcher: new MockMatcher(["3-24-FunctionDeclaration"]),
        }),
      ];

      const sourceDocument = await createSourceDocument(
        "file.js",
        `id; function f() { id; }`,
        types
      );

      await sourceDocument.getBasicCodeAssists(types.map((type) => type.id));

      const result = await sourceDocument.applyCodeAssistsById({
        codeAssistIds: [
          "0:mock-0:0-3-ExpressionStatement:",
          "0:mock-1:3-24-FunctionDeclaration:",
        ],
      });

      expect(result).toEqual({
        edit: undefined,
        applicationResults: [
          {
            codeAssistId: "0:mock-0:0-3-ExpressionStatement:",
            result: "applied",
          },
          {
            codeAssistId: "0:mock-1:3-24-FunctionDeclaration:",
            result: "rejected/conflict",
          },
        ],
      });
    });
  });

  describe("getCodeAssistAction", () => {
    it("should return the correct edit for a suggestion code assist with a single embedded range", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
            safetyLevel: "INFORMATION",
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      const action = await sourceDocument.getCodeAssistAction({
        codeAssistId: codeAssists[0].id,
        interactiveInput: undefined,
      });

      expect(action).toEqual({
        edit: new Edit(new Range(0, 7), "replacemen"),
        postEditActions: undefined,
      });
    });

    it("should return the correct edit for a suggestion code assist with multiple embedded ranges", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "test.vue",
        `
<script>
anObject.doSomething();
</script>
<script setup>
doSomethingElse();
</script>
`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      expect(
        await sourceDocument.getCodeAssistAction({
          codeAssistId: codeAssists[0].id,
          interactiveInput: undefined,
        })
      ).toEqual({
        edit: new Edit(new Range(10, 17), "replacemen"),
        postEditActions: undefined,
      });
      expect(
        await sourceDocument.getCodeAssistAction({
          codeAssistId: codeAssists[1].id,
          interactiveInput: undefined,
        })
      ).toEqual({
        edit: new Edit(new Range(19, 30), "replacement"),
        postEditActions: undefined,
      });
      expect(
        await sourceDocument.getCodeAssistAction({
          codeAssistId: codeAssists[2].id,
          interactiveInput: undefined,
        })
      ).toEqual({
        edit: new Edit(new Range(59, 74), "replacement"),
        postEditActions: undefined,
      });
    });

    it("should return the correct edit for selection code assist", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
            safetyLevel: "INFORMATION",
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
        codeAssistTypeIds: [type.id],
        range: new Range(0, 0),
      });

      const action = await sourceDocument.getCodeAssistAction({
        codeAssistId: codeAssists[0].id,
        interactiveInput: undefined,
      });

      expect(action).toEqual({
        edit: new Edit(new Range(0, 7), "replacemen"),
        postEditActions: undefined,
      });
    });
  });

  describe("getBasicCodeAssists", () => {
    it("should return code assists", async () => {
      const identifierCodeAssistType = new IdentifierCodeAssist();

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [identifierCodeAssistType]
      );

      const { codeAssists } = await sourceDocument.getBasicCodeAssists([
        identifierCodeAssistType.id,
      ]);

      expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
        "0:identifier:0-8-Identifier:",
        "0:identifier:9-20-Identifier:",
      ]);
    });
  });

  describe("getSuggestedCodeAssists", () => {
    it("should return an empty array when there are no code assist types", async () => {
      const sourceDocument = await createSourceDocument("file.js", "", []);
      const result = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [],
      });

      expect(result).toEqual({
        codeAssists: [],
        errors: [],
      });
    });

    it("should record an error when a code assist id cannot be resolved", async () => {
      const sourceDocument = await createSourceDocument("file.js", "", []);
      const result = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: ["unknown-type"],
      });

      expect(result).toEqual({
        codeAssists: [],
        errors: ["Code assist 'unknown-type' was not found."],
      });
    });

    it("should not return code assists that are no suggestions", async () => {
      const identifierCodeAssistType = new IdentifierCodeAssist();

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [identifierCodeAssistType]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [identifierCodeAssistType.id],
      });

      expect(codeAssists).toEqual([]);
    });

    it("should not include transformations that are not applicable", async () => {
      const identifierCodeAssistType = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
            isApplicable: false,
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [identifierCodeAssistType]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [identifierCodeAssistType.id],
      });

      expect(codeAssists).toEqual([]);
    });

    it("should only return suggestions for specified code assist type", async () => {
      const types = [
        new IdentifierCodeAssist({
          id: "identifier-1",
          transformations: [
            new IdentifierTransformation({
              isSuggestion: true,
            }),
          ],
        }),
        new IdentifierCodeAssist({
          id: "identifier-2",
          transformations: [
            new IdentifierTransformation({
              isSuggestion: true,
            }),
          ],
        }),
      ];

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        types
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [types[1].id],
      });

      expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
        "0:identifier-2:0-8-Identifier:",
        "0:identifier-2:9-20-Identifier:",
      ]);
    });

    it("should return suggestions", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
            safetyLevel: "INFORMATION",
          }),
        ],
      });

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        [type]
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      expect(
        codeAssists.map((codeAssist) => ({
          id: codeAssist.id,
          description: codeAssist.description,
          primaryLineCharacterRange: codeAssist.primaryLineCharacterRange,
          safety: codeAssist.safety,
          suggestionRanges: codeAssist.suggestionRanges,
        }))
      ).toEqual([
        {
          id: "0:identifier:0-8-Identifier:",
          description: "description:anObject",
          primaryLineCharacterRange: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 8 },
          },
          safety: Safety.information("safety-anObject"),
          suggestionRanges: [new Range(0, 8)],
        },
        {
          id: "0:identifier:9-20-Identifier:",
          description: "description:doSomething",
          primaryLineCharacterRange: {
            start: { line: 0, character: 9 },
            end: { line: 0, character: 20 },
          },
          safety: Safety.information("safety-doSomething"),
          suggestionRanges: [new Range(9, 20)],
        },
      ]);
    });

    it("should return suggestions for multiple parse ranges", async () => {
      const type = new IdentifierCodeAssist({
        transformations: [
          new IdentifierTransformation({
            isSuggestion: true,
          }),
        ],
      });
      const sourceDocument = await createSourceDocument(
        "test.vue",
        `
<script>
anObject.doSomething();
</script>
<script setup>
doSomethingElse();
</script>
`,
        [type]
      );
      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: [type.id],
      });

      expect(
        codeAssists.map((codeAssist) => ({
          id: codeAssist.id,
          description: codeAssist.description,
          primaryLineCharacterRange: codeAssist.primaryLineCharacterRange,
          suggestionRanges: codeAssist.suggestionRanges,
        }))
      ).toEqual([
        {
          id: "0:identifier:0-9-Identifier:",
          description: "description:anObject",
          primaryLineCharacterRange: {
            start: { line: 2, character: 0 },
            end: { line: 2, character: 8 },
          },
          suggestionRanges: [new Range(10, 18)],
        },
        {
          id: "0:identifier:10-21-Identifier:",
          description: "description:doSomething",
          primaryLineCharacterRange: {
            start: { line: 2, character: 9 },
            end: { line: 2, character: 20 },
          },
          suggestionRanges: [new Range(19, 30)],
        },
        {
          id: "1:identifier:0-16-Identifier:",
          description: "description:doSomethingElse",
          primaryLineCharacterRange: {
            start: { line: 5, character: 0 },
            end: { line: 5, character: 15 },
          },
          suggestionRanges: [new Range(59, 74)],
        },
      ]);
    });

    it("should create code assists for all transformations", async () => {
      const types = [
        new IdentifierCodeAssist({
          transformations: [
            new IdentifierTransformation({
              id: "transform-1",
              isSuggestion: true,
            }),
            new IdentifierTransformation({
              id: "transform-2",
              isSuggestion: true,
            }),
          ],
        }),
      ];

      const sourceDocument = await createSourceDocument(
        "file.js",
        `anObject.doSomething();`,
        types
      );

      const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: types.map((type) => type.id),
      });

      expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
        "0:identifier:0-8-Identifier:transform-1",
        "0:identifier:0-8-Identifier:transform-2",
        "0:identifier:9-20-Identifier:transform-1",
        "0:identifier:9-20-Identifier:transform-2",
      ]);
    });

    describe("highlightRanges", () => {
      it("should include the correct highlightRanges in the code assist", async () => {
        const ranges = [new Range(1, 3), new Range(5, 7)];

        const type = new IdentifierCodeAssist({
          transformations: [
            new IdentifierTransformation({
              isSuggestion: true,
              nodeHighlightRanges: {
                "0-8-Identifier": ranges,
              },
            }),
          ],
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `anObject.doSomething();`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
          codeAssistTypeIds: [type.id],
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            highlightRanges: codeAssist.highlightRanges,
          }))
        ).toEqual([
          {
            id: "0:identifier:0-8-Identifier:",
            highlightRanges: ranges,
          },
          {
            id: "0:identifier:9-20-Identifier:",
            highlightRanges: [new Range(9, 20)],
          },
        ]);
      });

      it("should return highlight ranges with embed-adjusted positions", async () => {
        const type = new IdentifierCodeAssist({
          transformations: [
            new IdentifierTransformation({
              isSuggestion: true,
            }),
          ],
        });
        const sourceDocument = await createSourceDocument(
          "test.vue",
          `
<script>
anObject.doSomething();
</script>
<script setup>
doSomethingElse();
</script>
`,
          [type]
        );
        const { codeAssists } = await sourceDocument.getSuggestedCodeAssists({
          codeAssistTypeIds: [type.id],
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            highlightRanges: codeAssist.highlightRanges,
          }))
        ).toEqual([
          {
            id: "0:identifier:0-9-Identifier:",
            highlightRanges: [new Range(10, 18)],
          },
          {
            id: "0:identifier:10-21-Identifier:",
            highlightRanges: [new Range(19, 30)],
          },
          {
            id: "1:identifier:0-16-Identifier:",
            highlightRanges: [new Range(59, 74)],
          },
        ]);
      });
    });
  });

  describe("getSelectionCodeAssists", () => {
    describe("onlyFirstMatch", () => {
      it("should just return the first match from 2 different code assists", async () => {
        const types = [
          new MockCodeAssist({
            id: "mock-1",
            matcher: new MockMatcher(["1-6-Block"]),
          }),
          new MockCodeAssist({
            id: "mock-2",
            matcher: new MockMatcher(["0-8-Block"]),
          }),
        ];

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          types
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: types.map((type) => type.id),
          range: new Range(2, 2),
          onlyFirstMatch: true,
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:mock-1:1-6-Block:",
        ]);
      });

      it("should return empty result when blocked zone is hit", async () => {
        const types = [
          new MockCodeAssist({
            id: "mock-1",
            codeActionKinds: ["mockKind"],
            matcher: new MockMatcher(["1-6-Block"]),
            transformations: [
              new MockTransformation({
                isApplicable: false,
                blockedZones: new Map([
                  [
                    "1-6-Block",
                    [
                      {
                        range: new Range(2, 2),
                        codeActionKindIndex: 0,
                      },
                    ],
                  ],
                ]),
              }),
            ],
          }),
          new MockCodeAssist({
            id: "mock-2",
            matcher: new MockMatcher(["0-8-Block"]),
          }),
        ];

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          types
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: types.map((type) => type.id),
          range: new Range(2, 2),
          onlyFirstMatch: true,
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([]);
      });

      it("should return inner node match even when there is an outer blocked zone in another code assist", async () => {
        const types = [
          // evaluated first, blocks on outer node:
          new MockCodeAssist({
            id: "mock-1",
            codeActionKinds: ["mockKind"],
            matcher: new MockMatcher(["0-8-Block"]),
            transformations: [
              new MockTransformation({
                isApplicable: false,
                blockedZones: new Map([
                  [
                    "0-8-Block",
                    [
                      {
                        range: new Range(2, 2),
                        codeActionKindIndex: 0,
                      },
                    ],
                  ],
                ]),
              }),
            ],
          }),
          new MockCodeAssist({
            id: "mock-2",
            codeActionKinds: ["mockKind"],
            matcher: new MockMatcher(["1-6-Block"]),
          }),
        ];

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          types
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: types.map((type) => type.id),
          range: new Range(2, 2),
          onlyFirstMatch: true,
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:mock-2:1-6-Block:",
        ]);
      });
    });

    describe("range: single location", () => {
      it("should prioritize highest activation zone level", async () => {
        const type = new MockCodeAssist({
          matcher: new MockMatcher(["1-6-Block", "0-8-Block"]),
          transformations: [
            new MockTransformation({
              actionZones: new Map([
                [
                  "1-6-Block",
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 0,
                      label: "l1-1",
                      level: CodeAssistLevel.Regular,
                    },
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 0,
                      label: "l1-2",
                      level: CodeAssistLevel.QuickFix,
                    },
                  ],
                ],
              ]),
            }),
          ],
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(2, 2),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            label: codeAssist.label,
            level: codeAssist.level,
          }))
        ).toEqual([
          {
            id: "0:mock:1-6-Block:",
            label: "l1-2",
            level: CodeAssistLevel.QuickFix,
          },
        ]);
      });

      it("should only return code assists that match the specified code action prefix", async () => {
        const type = new MockCodeAssist({
          codeActionKinds: ["mock-kind-1", "mock-kind-2"],
          matcher: new MockMatcher(["0-8-Block", "1-6-Block"]),
          transformations: [
            new MockTransformation({
              actionZones: new Map([
                [
                  "0-8-Block",
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 0,
                      label: "l1",
                      level: CodeAssistLevel.Regular,
                    },
                  ],
                ],
                [
                  "1-6-Block", // would come first
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 1,
                      label: "l2",
                      level: CodeAssistLevel.Regular,
                    },
                  ],
                ],
              ]),
            }),
          ],
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          codeActionKindPrefix: "mock-kind-1",
          range: new Range(2, 2),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            kind: codeAssist.kind,
          }))
        ).toEqual([
          {
            id: "0:mock:0-8-Block:",
            kind: "mock-kind-1.p42",
          },
        ]);
      });

      it("should return overlapping code assists with different code action kinds for the same type", async () => {
        const type = new MockCodeAssist({
          codeActionKinds: ["mock-kind-1", "mock-kind-2"],
          matcher: new MockMatcher(["0-8-Block", "1-6-Block"]),
          transformations: [
            new MockTransformation({
              actionZones: new Map([
                [
                  "0-8-Block",
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 0,
                      label: "l1",
                      level: CodeAssistLevel.Regular,
                    },
                  ],
                ],
                [
                  "1-6-Block",
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 1,
                      label: "l2",
                      level: CodeAssistLevel.Regular,
                    },
                  ],
                ],
              ]),
            }),
          ],
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(2, 2),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            kind: codeAssist.kind,
          }))
        ).toEqual([
          {
            id: "0:mock:1-6-Block:",
            kind: "mock-kind-2.p42",
          },
          {
            id: "0:mock:0-8-Block:",
            kind: "mock-kind-1.p42",
          },
        ]);
      });

      it("should return only deepest matching code assist per kind when there are multiple kinds", async () => {
        const type = new MockCodeAssist({
          codeActionKinds: ["mock-kind-1", "mock-kind-2"],
          matcher: new MockMatcher(["0-8-Block", "1-6-Block"]),
          transformations: [
            new MockTransformation({
              actionZones: new Map([
                [
                  "0-8-Block",
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 0,
                      label: "l1",
                      level: CodeAssistLevel.Regular,
                    },
                  ],
                ],
                [
                  "1-6-Block",
                  [
                    {
                      range: new Range(2, 3),
                      codeActionKindIndex: 0,
                      label: "l2",
                      level: CodeAssistLevel.Regular,
                    },
                  ],
                ],
              ]),
            }),
          ],
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(2, 2),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            kind: codeAssist.kind,
          }))
        ).toEqual([
          {
            id: "0:mock:1-6-Block:",
            kind: "mock-kind-1.p42",
          },
        ]);
      });

      it("should return suggestion that starts at location", async () => {
        const type = new IdentifierCodeAssist({});

        const sourceDocument = await createSourceDocument(
          "file.js",
          `anObject.doSomething();`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(0, 0),
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:identifier:0-8-Identifier:",
        ]);
      });

      it("should not include result if position is outside of activation zone", async () => {
        const type = new IdentifierCodeAssist({
          transformations: [
            new IdentifierTransformation({
              nodeActionZones: {
                "0-8-Identifier": (node) => [
                  createMockActionZone({
                    range: new Range(1, 8),
                  }),
                ],
              },
            }),
          ],
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `anObject.doSomething();`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(0, 0),
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([]);
      });

      it("should return results for 2nd parse range", async () => {
        const type = new IdentifierCodeAssist();
        const sourceDocument = await createSourceDocument(
          "test.vue",
          `
<script>
anObject.doSomething();
</script>
<script setup>
doSomethingElse();
</script>
`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(61, 61),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
          }))
        ).toEqual([
          {
            id: "1:identifier:0-16-Identifier:",
          },
        ]);
      });
    });

    describe("range: selection", () => {
      it("should return suggestion that starts at location", async () => {
        const type = new IdentifierCodeAssist();

        const sourceDocument = await createSourceDocument(
          "file.js",
          `anObject.doSomething();`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(0, 2),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            label: codeAssist.label,
          }))
        ).toEqual([
          {
            id: "0:identifier:0-8-Identifier:",
            label: "label:anObject:range-0-2",
          },
        ]);
      });

      it("should ignore leading and trailing whitespace", async () => {
        const type = new MockCodeAssist({
          matcher: new MockMatcher(["21-41-ExpressionStatement"]),
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{
    doSomething1();
    doSomething2();
    doSomething3();
}`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(24, 44),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            label: codeAssist.label,
          }))
        ).toEqual([
          {
            id: "0:mock:21-41-ExpressionStatement:",
            label: "label:21-41-ExpressionStatement:range-24-44",
          },
        ]);
      });

      it("should return results for 2nd parse range", async () => {
        const type = new IdentifierCodeAssist();
        const sourceDocument = await createSourceDocument(
          "test.vue",
          `
<script>
anObject.doSomething();
</script>
<script setup>
doSomethingElse();
</script>
`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(61, 65),
        });

        expect(
          codeAssists.map((codeAssist) => ({
            id: codeAssist.id,
            label: codeAssist.label,
          }))
        ).toEqual([
          {
            id: "1:identifier:0-16-Identifier:",
            label: "label:doSomethingElse:range-3-7",
          },
        ]);
      });
    });

    describe("minimumLevel: quick-fix", () => {
      it("should return only suggestions at location", async () => {
        const types = [
          new IdentifierCodeAssist({
            id: "identifier-1",
            transformations: [
              new IdentifierTransformation({
                nodeActionZones: {
                  "0-8-Identifier": (node) => [
                    createMockActionZone({
                      range: NodeRange.node(node),
                      level: QuickFix,
                    }),
                  ],
                },
              }),
            ],
          }),
          new IdentifierCodeAssist({
            id: "identifier-2",
            transformations: [
              new IdentifierTransformation({
                nodeActionZones: {
                  "0-8-Identifier": (node) => [
                    createMockActionZone({
                      range: NodeRange.node(node),
                      level: Regular,
                    }),
                  ],
                },
              }),
            ],
          }),
        ];

        const sourceDocument = await createSourceDocument(
          "file.js",
          `anObject.doSomething();`,
          types
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: types.map((type) => type.id),
          minimumLevel: CodeAssistLevel.QuickFix,
          range: new Range(0, 0),
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:identifier-1:0-8-Identifier:",
        ]);
      });
    });

    describe("evaluate the child candidates", () => {
      it("should return activation zone when node is found through getCandidateChildren", async () => {
        const type = new IdentifierCodeAssist({
          transformations: [
            new IdentifierTransformation({
              nodeActionZones: {
                "0-5-Identifier": () => [],
                "6-11-Identifier": (node) => [
                  createMockActionZone({
                    range: new Range(0, 5),
                  }),
                ],
              },
            }),
          ],
          getCandidateChildrenFunction: (parent) => {
            if (ts.isCallExpression(parent)) {
              return parent.arguments;
            }
          },
        });

        const sourceDocument = await createSourceDocument(
          "file.js",
          `outer(inner);`,
          [type]
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: [type.id],
          range: new Range(2, 2),
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:identifier:6-11-Identifier:",
        ]);
      });
    });

    describe("select most specific node", () => {
      it("should only return innermost matched code assist", async () => {
        const types = [new BlockCodeAssist({})];

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          types
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: types.map((type) => type.id),
          range: new Range(4, 4),
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:block:1-6-Block:",
        ]);
      });

      it("should return an outer code assist if the activation zone of the inner assist doesn't include the position", async () => {
        const types = [
          new BlockCodeAssist({
            transformations: [
              new BlockTransformation({
                nodeActionZones: {
                  "0-8-Block": (node: ts.Node) => [
                    createMockActionZone({
                      range: NodeRange.node(node),
                    }),
                  ],
                  "1-6-Block": (node: ts.Node) => [
                    createMockActionZone({
                      range: new Range(2, 3),
                    }),
                  ],
                },
              }),
            ],
          }),
        ];

        const sourceDocument = await createSourceDocument(
          "file.js",
          `{ {  } }`,
          types
        );

        const { codeAssists } = await sourceDocument.getSelectionCodeAssists({
          codeAssistTypeIds: types.map((type) => type.id),
          range: new Range(4, 4),
        });

        expect(codeAssists.map((codeAssist) => codeAssist.id)).toEqual([
          "0:block:0-8-Block:",
        ]);
      });
    });
  });
});
