
## Input
```javascript input
export class Finding<T extends p42.AnyMatch> {
  readonly safetyInformation: p42.SafetyInformation;

  private convertToDocumentRange(range: ts.ReadonlyTextRange): Range {
    const offset = this.refactoringEngine.offset;
    return {
      start: this.document.positionAt(range.pos + offset),
      end: this.document.positionAt(range.end + offset),
    };
  }

  async getTransformationDetails(): Promise<TransformationDetails | undefined> {
    const interactiveEdit = await this.createInteractiveEdit();

    if (interactiveEdit == null) {
      return undefined;
    }

    const edit = interactiveEdit.edit;

    return {
      range: this.convertToDocumentRange(edit),
      replacement: edit.replacement,
      postEditOperation: interactiveEdit.postEditOperation,
    };
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
export class Finding<T extends p42.AnyMatch> {
  readonly safetyInformation: p42.SafetyInformation;

  private convertToDocumentRange(range: ts.ReadonlyTextRange): Range {
    const { offset } = this.refactoringEngine;
    return {
      start: this.document.positionAt(range.pos + offset),
      end: this.document.positionAt(range.end + offset),
    };
  }

  async getTransformationDetails(): Promise<TransformationDetails | undefined> {
    const interactiveEdit = await this.createInteractiveEdit();

    if (interactiveEdit == null) {
      return undefined;
    }

    const { edit } = interactiveEdit;

    return {
      range: this.convertToDocumentRange(edit),
      replacement: edit.replacement,
      postEditOperation: interactiveEdit.postEditOperation,
    };
  }
}
```
