
## Input
```javascript input
class C {
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
  "38-61-ExpressionStatement": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
class C {
  aField = 123;

  constructor() {
  }
}
```
