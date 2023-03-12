import { Range } from "../../util/text/Range";

export class Edit {
  constructor(readonly range: Range, readonly replacement: string) {}

  applyTo(text: string, offset = 0) {
    return (
      text.substring(0, this.range.start + offset) +
      this.replacement +
      text.substring(this.range.end + offset)
    );
  }
}
