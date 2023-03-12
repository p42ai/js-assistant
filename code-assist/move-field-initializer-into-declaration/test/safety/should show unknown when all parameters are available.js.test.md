
## Input
```javascript input
const aValue = "123";

const C = class {
  aField;

  constructor(aParameter) {
    this.aField = new SomeObject(aValue);
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
  "79-121-ExpressionStatement": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
const aValue = "123";

const C = class {
  aField = new SomeObject(aValue);

  constructor(aParameter) {
  }
}
```
