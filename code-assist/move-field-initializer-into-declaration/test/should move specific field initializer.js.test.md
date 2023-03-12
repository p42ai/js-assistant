
## Input
```javascript input
const C = class {
  aField1;
  aField2;
  aField3;

  constructor() {
    this.aField1 = "a1";
    this.aField2 = "a2";
    this.aField3 = "a3";
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "99-99"
}
```

## Expected Output
```javascript expected output
const C = class {
  aField1;
  aField2 = "a2";
  aField3;

  constructor() {
    this.aField1 = "a1";
    this.aField3 = "a3";
  }
}
```
