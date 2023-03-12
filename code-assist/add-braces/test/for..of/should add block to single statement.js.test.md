## Input

```javascript input
for (const a of b) doSomething();
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Matches

```json expected matches
{
  "0-33-ForOfStatement": {
    "actionZones": [
      {
        "range": "0-33",
        "label": "Add {…} to for",
        "kind": "refactor.rewrite.toggle.braces.for.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output

```javascript expected output
for (const a of b) {
  doSomething();
}
```
