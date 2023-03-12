
## Input
```javascript input
class C extends D {
  aField = 123;

  constructor(...args) {
    super(...args);
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

  constructor(...args) {
    super(...args);
    this.aField = 123;
  }
}
```
