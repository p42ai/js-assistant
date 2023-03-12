
## Input
```javascript input
const { a } = f();
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
      "level": "WARNING",
      "message": "removes destructuring with potential side-effects; removes initializer with potential side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
```
