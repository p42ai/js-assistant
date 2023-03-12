
## Input
```javascript input
const C = class {
  /**
   * Field 1 comment
   */
  aField1;

  /**
   * Field 2 comment
   */
  aField2;

  // Field 3
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
  "selection": "180-180"
}
```

## Expected Output
```javascript expected output
const C = class {
  /**
   * Field 1 comment
   */
  aField1;

  /**
   * Field 2 comment
   */
  aField2 = "a2";

  // Field 3
  aField3;

  constructor() {
    this.aField1 = "a1";
    this.aField3 = "a3";
  }
}
```
