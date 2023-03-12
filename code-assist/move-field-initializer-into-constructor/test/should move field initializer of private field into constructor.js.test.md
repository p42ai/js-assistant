
## Input
```javascript input
class C {
  #aField = 123;

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
class C {
  #aField;

  constructor() {
    this.#aField = 123;
  }
}
```
