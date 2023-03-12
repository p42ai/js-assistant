
## Input
```javascript input
const C = class {
  aField;

  constructor() {
    this.aField = 123;
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
  "46-69-ExpressionStatement": {
    "actionZones": [
      {
        "range": "51-69",
        "label": "Move initialization into field declaration",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const C = class {
  aField = 123;

  constructor() {
  }
}
```
