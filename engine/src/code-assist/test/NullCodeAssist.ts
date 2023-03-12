import { NullMatch } from "../../matcher/engine/NullMatch";
import { NullMatcher } from "../../matcher/engine/NullMatcher";
import { Language } from "../../parser/file-type/Language";
import { NullTransformation } from "../../transformation/NullTransformation";
import { CodeAssistType } from "../CodeAssistType";

export class NullCodeAssist extends CodeAssistType<NullMatch> {
  constructor(languages: Array<Language>) {
    super(
      {
        id: "null",
        platform: {
          languages,
        },
        visualStudioCode: {
          codeActionKinds: ["null"],
        },
        documentation: {
          title: "null code action",
          shortDescription: "null code action",
          references: undefined,
          categories: ["cleanup"],
        },
      },
      new NullMatcher(),
      [new NullTransformation()]
    );
  }
}
