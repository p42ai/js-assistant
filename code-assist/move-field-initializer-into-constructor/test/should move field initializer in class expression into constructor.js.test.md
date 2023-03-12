
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

## Expected Output
```javascript expected output
const C = class {
  aField;

  constructor() {
    this.aField = 123;
  }
}
```
