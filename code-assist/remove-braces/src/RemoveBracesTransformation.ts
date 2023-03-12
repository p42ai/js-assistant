
import {
  ActionZone,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { createRemoveBracesActionZones } from "./createRemoveBracesActionZones";
import { RemoveBracesMatch } from "./RemoveBracesMatch";

export class RemoveBracesTransformation extends Transformation<RemoveBracesMatch> {
  constructor() {
    super("default");
  }

  isApplicable(match: RemoveBracesMatch): boolean {
    return match.captures.block != null && match.captures.statement != null;
  }

  async apply(match: RemoveBracesMatch, tree: TransformedNodeTree) {
    tree.replace(match.captures.block!, match.captures.statement!);
  }

  analyzeSafety(match: RemoveBracesMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getActionZones(
    match: RemoveBracesMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createRemoveBracesActionZones(
      match,
      match.typeForStatement,
      match.captures.block!
    );
  }
}
