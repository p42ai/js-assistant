import { SafetyLevel } from "../../transformation/safety/SafetyLevel";
import { Range } from "../../util/text/Range";
import { CodeAssistApplicationResult } from "../CodeAssistApplicationResult";
import { CodeAssistLevelString } from "../CodeAssistLevel";

export type CodeAssistTestConfiguration = {
  /**
   * File extension.
   */
  extension: string;

  /**
   * Node that should be transformed.
   */
  transformedNodeId: string;

  /**
   * Id of the transformation that should be selected when there are multiple transformations.
   * If undefined, the first transformation is used.
   */
  transformationId: string | undefined;

  /**
   * Selected range in format "from-to". This will automatically use the 'getSelectionCodeAssists' method
   * to generate the code assists.
   */
  selection: string | undefined;

  interactiveInput:
    | {
        selectOption:
          | {
              return: string | undefined;
            }
          | undefined;
      }
    | undefined;

  /**
   * Ignore non-suggested matches. Default: "false"
   */
  onlySuggestions: boolean | undefined;

  /**
   * Line ending. Default: "lf"
   */
  lineEnding: "lf" | "crlf" | undefined;
};

/**
 * Map of matched node ids to expected match data.
 */
export type ExpectedMatches = Record<
  string,
  {
    safety?: {
      level: SafetyLevel;
      message?: string;
    };

    applicationResult: CodeAssistApplicationResult["result"];

    /**
     * Ids of the transformations that are available for a match. Can be used to
     * ensure that certain transformations are *not* available.
     */
    availableTransformations?: Array<string>;

    blockedZones?:
      | Array<{
          range: string;
          kind: string;
        }>
      | null
      | undefined;

    suggestion?:
      | {
          description?: string;

          /**
           * Highlight text ranges as strings of the format `${startPosition}-${endPosition}`.
           */
          highlightRanges?: Array<string>;
        }
      | null
      | undefined;

    actionZones?: Array<{
      /**
       * format `${startPosition}-${endPosition}`
       */
      range: string;
      label: string;
      kind: string;
      level: CodeAssistLevelString;
    }>;

    postEditActions?: [
      {
        type: "HIGHLIGHT";
        highlights: Array<Range>;
      },
      {
        type: "RENAME";
        position: number;
      },
      {
        type: "SELECT";
        selections: Array<Range>;
      }
    ];
  } | null
>;

export class CodeAssistTestSpecification {
  readonly input: string;

  readonly configuration: CodeAssistTestConfiguration;

  readonly expectedMatches: ExpectedMatches | undefined;

  readonly expectedOutput: string | undefined;

  constructor(
    input: string,
    expectedOutput: string | undefined,
    expectedMatches: ExpectedMatches | undefined,
    configuration: CodeAssistTestConfiguration
  ) {
    this.input = input;
    this.configuration = configuration;
    this.expectedOutput = expectedOutput;
    this.expectedMatches = expectedMatches;
  }
}
