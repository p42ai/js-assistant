## Improvements

This would be better solved through chaining transformations:
```javascript
    if (isDocumentSupported(editor?.document)) {
      this.setActiveEditor(editor);
    } else {
      this.setActiveEditor(undefined);
    }
```