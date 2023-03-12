import {
  ActionZone,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { AddBracesMatch } from "./AddBracesMatch";
import { createAddBracesActionZones } from "./createAddBracesActionZones";
import { wrapInBlock } from "./wrapInBlock";

export class AddBracesTransformation extends Transformation<AddBracesMatch> {
  constructor() {
    super("default");
  }

  isApplicable(match: AddBracesMatch): boolean {
    return match.captures.statement != null;
  }

  async apply(match: AddBracesMatch, tree: TransformedNodeTree) {
    wrapInBlock(match.captures.statement!, tree);
  }

  analyzeSafety(match: AddBracesMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getActionZones(match: AddBracesMatch, isSuggestion: boolean): ActionZone[] {
    return createAddBracesActionZones(
      match,
      match.typeForStatement,
      match.captures.statement!
    );
  }
}
