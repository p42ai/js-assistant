import { Language } from "../parser/file-type/Language";
import { EcmaScriptVersion } from "./EcmaScriptVersion";

export const CodeAssistDocumentationCategories = [
  "action",
  "ai",
  "branching",
  "class",
  "cleanup",
  "collection",
  "core",
  "destructuring",
  "documentation",
  "function",
  "library-lodash",
  "library-react",
  "loops",
  "logical-expression",
  "modernization",
  "move",
  "string",
  "syntax-conversion",
  "typescript",
  "variable",
] as const;

export type CodeAssistMetadata = {
  id: string;

  /**
   * Enabled flag. Defaults to true.
   */
  isEnabled?: boolean | undefined;

  /**
   * Set to true if the code assist requires a cloud AI endpoint.
   * Default to false (no cloud AI needed).
   */
  requiresCloudAi?: boolean;

  /**
   * Source/target platform of this refactoring (mixed right now):
   */
  platform: {
    // to determine if refactoring needs to be evaluated
    languages: Array<Language>;

    ecmaScript?: EcmaScriptVersion;
  };

  isModernization?: boolean | undefined;

  // default: false
  // set to true if the refactoring can result in a safe change
  canBeSafe?: boolean | undefined;

  suggestions?:
    | {
        available: boolean; // default: false
        // the level values match the Visual Studio code diagnostic severities:
        defaultLevel?:
          | "off"
          | "hint"
          | "information"
          | "warning"
          | "error"
          | undefined; // default: "hint"
      }
    | undefined
    | null;

  visualStudioCode: {
    /**
     * What default code assist from VS Code / TypeScript language server, if any,
     * does this code assist replace?
     */
    overlappingCodeAssist?: string;

    /**
     * Code action kinds (by id) that should be used. It is suffixed with
     * ".p42".
     */
    codeActionKinds: Array<string>;
  };

  documentation: {
    title: string;
    shortDescription: string;

    /**
     * Categories that are shown in the documentation. A refactoring can belong to multiple categories.
     */
    categories: Array<typeof CodeAssistDocumentationCategories[number]>;

    references?: Array<{
      label: string;
      href: string;
    }>;

    relatedCodeAssists?: Array<string>;
  };
};

export const getMetadataCodeActionKinds = (
  metadata: CodeAssistMetadata
): Array<string> =>
  metadata.visualStudioCode.codeActionKinds.map((kind) => `${kind}.p42`);
