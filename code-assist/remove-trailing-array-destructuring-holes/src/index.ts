
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveTrailingArrayDestructuringHolesMatch } from "./RemoveTrailingArrayDestructuringHolesMatch";
import { RemoveTrailingArrayDestructuringHolesMatcher } from "./RemoveTrailingArrayDestructuringHolesMatcher";
import { RemoveTrailingArrayDestructuringHolesTransformation } from "./RemoveTrailingArrayDestructuringHolesTransformation";

export default class RemoveTrailingArrayDestructuringHolesCodeAssist extends CodeAssistType<RemoveTrailingArrayDestructuringHolesMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveTrailingArrayDestructuringHolesMatcher(),
      [new RemoveTrailingArrayDestructuringHolesTransformation()]
    );
  }
}
