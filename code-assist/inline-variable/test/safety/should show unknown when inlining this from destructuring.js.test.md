
## Input
```javascript input
const { a } = this;
console.log(a);
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
  "7-9-BindingElement": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(this.a);
```
