
## Input
```javascript input
var a = 123456;
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
  "3-14-VariableDeclaration": {
    "actionZones": [
      {
        "range": "3-11",
        "label": "Split declaration and initialization",
        "kind": "refactor.rewrite.split.variable-declaration-and-initialization.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
var a;
a = 123456;
```
