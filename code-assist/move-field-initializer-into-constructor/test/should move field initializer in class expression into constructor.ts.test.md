
## Input
```javascript input
const C = class {
  aField: number = 123;

  constructor() {
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const C = class {
  aField: number;

  constructor() {
    this.aField = 123;
  }
}
```
