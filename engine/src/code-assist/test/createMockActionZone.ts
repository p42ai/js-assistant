import { ActionZone } from "../../transformation/ActionZone";
import { Range } from "../../util/text/Range";
import { CodeAssistLevel, Regular } from "../CodeAssistLevel";

export function createMockActionZone({
  range,
  level = Regular,
}: {
  range: Range;
  level?: CodeAssistLevel;
}): ActionZone {
  return {
    range,
    label: "label",
    level,
    codeActionKindIndex: 0,
  };
}
