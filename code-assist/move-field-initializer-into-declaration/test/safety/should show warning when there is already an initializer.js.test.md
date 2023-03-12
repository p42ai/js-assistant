
## Input
```javascript input
const C = class {
  aField = 1;

  constructor() {
    this.aField = 2;
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
  "50-71-ExpressionStatement": {
    "safety": {
      "level": "WARNING",
      "message": "overwrites existing initial value"
    }
  }
}
```

## Expected Output
```javascript expected output
const C = class {
  aField = 2;

  constructor() {
  }
}
```
