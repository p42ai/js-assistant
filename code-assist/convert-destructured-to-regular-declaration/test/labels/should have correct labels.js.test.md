
## Input
```javascript input
const [value] = anArray;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"
}
```

## Expected Matches
```json expected matches
{
  "5-23-VariableDeclaration": {
    "actionZones": [
      {
        "label": "Convert destructuring to regular variable declaration",
        "kind": "refactor.rewrite.destructured-to-regular-declaration.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const value = anArray[0];
```
