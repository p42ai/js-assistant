
## Input
```javascript input
const C = class {
  aField = function() {
  };

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
  "17-46-PropertyDeclaration": {
    "actionZones": [
      {
        "range": "20-32",
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
    this.aField = function() {
    };
  }
}
```
