import * as fs from "fs";

export class Emitter {
  #text = "";

  emitCopyrightHeader() {
    this.#text += `
`;
  }

  emit(text: string) {
    this.#text += text;
  }

  writeToFile(filename: string) {
    fs.writeFileSync(filename, this.#text);
    // eslint-disable-next-line no-console
    console.log(`generated ${filename}`);
  }
}
