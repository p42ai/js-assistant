
## Input
```javascript input
for (const a of b) {
  doSomething();
}
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
  "0-39-ForOfStatement": {
    "actionZones": [
      {
        "range": "0-39",
        "label": "Remove {…} from for",
        "kind": "refactor.rewrite.toggle.braces.for.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
for (const a of b) doSomething();
```
