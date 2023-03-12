import { CoreAugmentations } from "../augmentation/CoreAugmentations";
import { CodeAssistApplicationResult } from "./CodeAssistApplicationResult";
import { FixedContent } from "./Content";
import { runMultiphase } from "./runMultiphase";
import { SourceDocumentFactory } from "./SourceDocumentFactory";
import {
  IdentifierCodeAssist,
  IdentifierTransformation,
} from "./test/IdentifierCodeAssist";

describe("runMultiphase", () => {
  it("should apply 2 sequential refactorings", async () => {
    const type = new IdentifierCodeAssist();

    const applicationResults: Array<Array<CodeAssistApplicationResult>> = [];

    const result = await runMultiphase({
      content: new FixedContent("test.js", undefined, `a.b();`),
      sourceDocumentFactory: new SourceDocumentFactory(CoreAugmentations, [
        type,
      ]),
      codeAssistProvider: {
        async getCodeAssists(sourceDocument) {
          const { codeAssists } = await sourceDocument.getBasicCodeAssists([
            type.id,
          ]);
          return codeAssists.length > 0 ? [codeAssists[0]] : [];
        },
        recordApplicationResults(results) {
          applicationResults.push(results);
        },
      },
    });

    expect(result).toEqual({
      content: "replacement.replacement();",
      hasChanged: true,
    });
    expect(applicationResults).toEqual([
      [
        {
          codeAssistId: "0:identifier:0-1-Identifier:",
          result: "applied",
        },
      ],
      [
        {
          codeAssistId: "0:identifier:12-13-Identifier:",
          result: "applied",
        },
      ],
    ]);
  });

  it("should abort when the source text reaches a known state", async () => {
    const type = new IdentifierCodeAssist({
      transformations: [
        new IdentifierTransformation({
          replacementText: "alternativeReplacement",
        }),
      ],
    });

    const applicationResults: Array<Array<CodeAssistApplicationResult>> = [];

    const result = await runMultiphase({
      content: new FixedContent("test.js", undefined, `a.b();`),
      sourceDocumentFactory: new SourceDocumentFactory(CoreAugmentations, [
        type,
      ]),
      codeAssistProvider: {
        async getCodeAssists(sourceDocument) {
          const { codeAssists } = await sourceDocument.getBasicCodeAssists([
            type.id,
          ]);
          return codeAssists.length > 0 ? [codeAssists[0]] : [];
        },
        recordApplicationResults(results) {
          applicationResults.push(results);
        },
      },
    });

    expect(result).toEqual({
      content: "alternativeReplacement.b();",
      hasChanged: true,
    });
    expect(applicationResults).toEqual([
      [
        {
          codeAssistId: "0:identifier:0-1-Identifier:",
          result: "applied",
        },
      ],
      [
        {
          codeAssistId: "0:identifier:0-22-Identifier:",
          result: "applied",
        },
      ],
    ]);
  });
});
