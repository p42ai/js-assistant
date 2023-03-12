
## Input
```javascript input
while (condition()) {
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
  "0-40-WhileStatement": {
    "actionZones": [
      {
        "range": "0-40",
        "label": "Remove {…} from while",
        "kind": "refactor.rewrite.toggle.braces.while.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
while (condition()) doSomething();
```
