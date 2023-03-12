
import {
  CodeAssistMetadata,
  CodeAssistType,
} from "@p42/engine";
import { ConvertArrayTypeToGenericArrayMatch } from "./ConvertArrayTypeToGenericArrayMatch";
import { ConvertArrayTypeToGenericArrayMatcher } from "./ConvertArrayTypeToGenericArrayMatcher";
import { ConvertArrayTypeToGenericArrayTransformation } from "./ConvertArrayTypeToGenericArrayTransformation";
import metadata from "./code-assist.json";

export default class ConvertArrayTypeToGenericArrayCodeAssist extends CodeAssistType<ConvertArrayTypeToGenericArrayMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertArrayTypeToGenericArrayMatcher(),
      [new ConvertArrayTypeToGenericArrayTransformation()]
    );
  }
}
