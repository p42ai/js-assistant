
## Input
```javascript input
class C extends D {
  aField = 123;

  constructor() {
    super();
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
class C extends D {
  aField;

  constructor() {
    super();
    this.aField = 123;
  }
}
```
