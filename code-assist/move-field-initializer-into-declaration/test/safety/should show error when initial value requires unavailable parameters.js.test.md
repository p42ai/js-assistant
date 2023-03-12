
## Input
```javascript input
const C = class {
  aField;

  constructor(aParameter) {
    this.aField = new SomeObject(aParameter);
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
  "56-102-ExpressionStatement": {
    "safety": {
      "level": "ERROR",
      "message": "parameters not available at field declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
const C = class {
  aField = new SomeObject(aParameter);

  constructor(aParameter) {
  }
}
```
