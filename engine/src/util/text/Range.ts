export class Range {
  static parse(rangeText: string) {
    const [fromText, toText] = rangeText.split("-");
    return new Range(+fromText, +toText);
  }

  constructor(readonly start: number, readonly end: number) {}

  isPosition(): boolean {
    return this.start === this.end;
  }

  move(offset: number): Range {
    return new Range(this.start + offset, this.end + offset);
  }

  containsRange(otherRange: Range): boolean {
    return this.start <= otherRange.start && otherRange.end <= this.end;
  }

  containsPosition(position: number): boolean {
    return this.start <= position && position <= this.end;
  }

  overlapsWith(other: Range): boolean {
    return (
      this.containsPosition(other.start) ||
      this.containsPosition(other.end) ||
      this.containsRange(other) ||
      other.containsRange(this)
    );
  }

  subtract(
    /**
     * Subtracted ranges are assumed to be inside range, to be non-overlapping, and
     * to be sorted by position.
     */
    rangesToSubtract: Array<Range>
  ): Array<Range> {
    const ranges: Array<Range> = [];

    let { start } = this;
    for (const rangeToSubtract of rangesToSubtract) {
      const end = rangeToSubtract.start;

      if (start < end) {
        ranges.push(new Range(start, end));
      }

      start = rangeToSubtract.end;
    }

    if (start < this.end) {
      ranges.push(new Range(start, this.end));
    }

    return ranges;
  }

  toString() {
    return `${this.start}-${this.end}`;
  }
}
