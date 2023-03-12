import { Node } from "typescript";
import { NullMatch } from "../matcher/engine/NullMatch";
import { ActionZone } from "./ActionZone";
import { Transformation } from "./Transformation";

export class NullTransformation extends Transformation<NullMatch> {
  apply() {
    return Promise.resolve();
  }

  getActionZones(match: NullMatch, isSuggestion: boolean): ActionZone[] {
    return [];
  }

  getImpactedNodes(match: NullMatch): Node[] {
    return [];
  }
}
