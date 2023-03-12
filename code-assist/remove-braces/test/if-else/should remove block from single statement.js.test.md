
## Input
```javascript input
if (condition) {} else {
  doSomething();
}
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
  "0-43-IfStatement": {
    "actionZones": [
      {
        "range": "18-43",
        "label": "Remove {…} from else",
        "kind": "refactor.rewrite.toggle.braces.if-else.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (condition) {} else doSomething();
```
