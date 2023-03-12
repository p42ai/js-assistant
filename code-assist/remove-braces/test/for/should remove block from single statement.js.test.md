
## Input
```javascript input
for (let i = 1; i < 10; i++) {
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
  "0-49-ForStatement": {
    "actionZones": [
      {
        "range": "0-49",
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
for (let i = 1; i < 10; i++) doSomething();
```
