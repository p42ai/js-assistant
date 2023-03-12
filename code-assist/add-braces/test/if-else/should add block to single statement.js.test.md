
## Input
```javascript input
if (condition) {} else doSomething();
```

## Configuration
```json configuration
{
  "extension": "js",
  "transformationId": "else"
}
```

## Expected Matches
```json expected matches
{
  "0-37-IfStatement": {
    "actionZones": [
      {
        "range": "18-37",
        "label": "Add {…} to else",
        "kind": "refactor.rewrite.toggle.braces.if-else.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (condition) {} else {
  doSomething();
}
```
