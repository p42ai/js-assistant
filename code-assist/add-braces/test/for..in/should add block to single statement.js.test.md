## Input

```javascript input
for (const a in b) doSomething();
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
  "0-33-ForInStatement": {
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
for (const a in b) {
  doSomething();
}
```
