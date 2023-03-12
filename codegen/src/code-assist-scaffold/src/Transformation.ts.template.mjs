import * as fs from "fs";
import { convertCodeAssistIdToName } from "../../convertCodeAssistIdToName.mjs";

export function generateCodeAssistTransformationTs(filename, codeAssistId) {
  const codeAssistName = convertCodeAssistIdToName(codeAssistId);

  fs.writeFileSync(
    filename,
    `
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
  InteractiveInput,
} from "@p42/engine";
import { ${codeAssistName}Match } from "./${codeAssistName}Match";

export class ${codeAssistName}Transformation extends Transformation<${codeAssistName}Match> {

  async apply(
    match: ${codeAssistName}Match,
    tree: TransformedNodeTree,
    interactiveInput: InteractiveInput | undefined
  ) {
    console.log("apply called");
    // TODO
  }

  analyzeSafety(match: ${codeAssistName}Match): Safety {
    const messages = new SafetyMessageList();

    return messages.produceUnknown();
  }

  getActionZones(
    match: ${codeAssistName}Match,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "TODO",
      [
        {
          range: NodeRange.node(match.node),
        },
      ]
    );
  }
}
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
