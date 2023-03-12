
## Input
```javascript input
class C {
  constructor(aParameter) {
    this.aProperty = aParameter * aParameter;
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "59-82"
}
```

## Expected Output
```javascript expected output
class C {
  constructor(aParameter) {
    const newVariable = aParameter * aParameter;
    this.aProperty = newVariable;
  }
}
```
