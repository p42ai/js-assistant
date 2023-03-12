
## Input
```javascript input
const C = class {
  aField = 123;

  constructor() {
  }
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
  "17-33-PropertyDeclaration": {
    "safety": {
      "level": "UNKNOWN"
    },
    "suggestion": null,
    "actionZones": [
      {
        "range": "20-32",
        "label": "Move initialization into constructor",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const C = class {
  aField;

  constructor() {
    this.aField = 123;
  }
}
```
