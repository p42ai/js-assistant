
## Input
```javascript input
let a;
a = 123;
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
  "3-5-VariableDeclaration": {
    "actionZones": [
      {
        "range": "0-5",
        "label": "Merge declaration and initialization",
        "level": "quickFix"
      },
      {
        "range": "7-10",
        "label": "Merge declaration and initialization",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = 123;
```
