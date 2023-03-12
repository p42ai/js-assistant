import fs from "fs";
import { CodeAssistErrorType } from "./CodeAssistErrorType";
import { asStructuredError } from "./StructuredError";

export abstract class Content {
  constructor(readonly path: string, readonly extension: string | undefined) {}

  abstract load(): Promise<string>;
}

export class FixedContent extends Content {
  constructor(
    path: string,
    extension: string | undefined,
    private readonly text: string
  ) {
    super(path, extension);
  }

  load(): Promise<string> {
    return Promise.resolve(this.text);
  }
}

export class FileContent extends Content {
  constructor(
    path: string,
    extension: string | undefined,
    readonly readFile: (file: string) => Promise<string> = async (
      file: string
    ) => fs.promises.readFile(file, { encoding: "utf8" })
  ) {
    super(path, extension);
  }

  load(): Promise<string> {
    try {
      return this.readFile(this.path);
    } catch (error) {
      throw asStructuredError(error, CodeAssistErrorType.READ_ERROR);
    }
  }
}
