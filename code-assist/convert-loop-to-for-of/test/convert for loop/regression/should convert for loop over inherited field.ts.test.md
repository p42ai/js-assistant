
## Input
```javascript input
class C {
  public applyEditRelativeToOriginal(edit: LineEdit): void {
    let firstAfter = false;
    let delta = 0;
    const newDiffs = new Array<LineDiff>();
    for (let i = 0; i < this._diffs.length; i++) {
      const diff = this._diffs[i];
      if (diff.originalRange.touches(edit.range)) {
        throw new BugIndicatingError("Edit must be conflict free.");
      } else if (diff.originalRange.isAfter(edit.range)) {
        if (!firstAfter) {
          firstAfter = true;

          newDiffs.push(
            new LineDiff(
              this.baseTextModel,
              edit.range,
              this.resultTextModel,
              new LineRange(
                edit.range.startLineNumber + delta,
                edit.newLines.length
              )
            )
          );
        }

        newDiffs.push(
          new LineDiff(
            diff.originalTextModel,
            diff.originalRange,
            diff.modifiedTextModel,
            diff.modifiedRange.delta(
              edit.newLines.length - edit.range.lineCount
            )
          )
        );
      } else {
        newDiffs.push(diff);
      }

      if (!firstAfter) {
        delta += diff.modifiedRange.lineCount - diff.originalRange.lineCount;
      }
    }

    if (!firstAfter) {
      firstAfter = true;

      newDiffs.push(
        new LineDiff(
          this.baseTextModel,
          edit.range,
          this.resultTextModel,
          new LineRange(
            edit.range.startLineNumber + delta,
            edit.newLines.length
          )
        )
      );
    }

    this._diffs = newDiffs;
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
class C {
  public applyEditRelativeToOriginal(edit: LineEdit): void {
    let firstAfter = false;
    let delta = 0;
    const newDiffs = new Array<LineDiff>();
    for (const diff of this._diffs) {
      if (diff.originalRange.touches(edit.range)) {
        throw new BugIndicatingError("Edit must be conflict free.");
      } else if (diff.originalRange.isAfter(edit.range)) {
        if (!firstAfter) {
          firstAfter = true;

          newDiffs.push(
            new LineDiff(
              this.baseTextModel,
              edit.range,
              this.resultTextModel,
              new LineRange(
                edit.range.startLineNumber + delta,
                edit.newLines.length
              )
            )
          );
        }

        newDiffs.push(
          new LineDiff(
            diff.originalTextModel,
            diff.originalRange,
            diff.modifiedTextModel,
            diff.modifiedRange.delta(
              edit.newLines.length - edit.range.lineCount
            )
          )
        );
      } else {
        newDiffs.push(diff);
      }

      if (!firstAfter) {
        delta += diff.modifiedRange.lineCount - diff.originalRange.lineCount;
      }
    }

    if (!firstAfter) {
      firstAfter = true;

      newDiffs.push(
        new LineDiff(
          this.baseTextModel,
          edit.range,
          this.resultTextModel,
          new LineRange(
            edit.range.startLineNumber + delta,
            edit.newLines.length
          )
        )
      );
    }

    this._diffs = newDiffs;
  }
}
```
