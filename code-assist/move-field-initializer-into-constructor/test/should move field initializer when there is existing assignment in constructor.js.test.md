
 TODO ideally there would be a warning

## Input
```javascript input
class C {
  aField = 123;

  constructor() {
    this.aField = 234;
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
class C {
  aField;

  constructor() {
    this.aField = 123;
    this.aField = 234;
  }
}
```
