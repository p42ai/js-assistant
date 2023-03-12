import * as p42 from "@p42/engine";
import { SerializedSuggestionCodeAssist } from "../code-assist/SerializedSuggestionCodeAssist";

export type InformationElement =
  | {
      type: "suggestion";
      id: string;
      codeAssist: SerializedSuggestionCodeAssist;
    }
  | {
      type: "function";
      id: string;
      functionElement: p42.FunctionElement;
      startLine: number;
      endLine: number;
    };
