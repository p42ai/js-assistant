
## Input
```javascript input
const a = 1, b = 2;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-18-VariableDeclarationList": {
    "actionZones": [
      {
        "range": "6-11",
        "label": "Move variable declaration down",
        "level": "regular",
        "kind": "refactor.move.down.variable-declaration.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["13-13"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const b = 2, a = 1;
```
