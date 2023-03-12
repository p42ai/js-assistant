
## Input
```javascript input
const [a, b, , ] = anArray;
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
  "5-16-ArrayBindingPattern": {
    "safety": {
      "level": "WARNING",
      "message": "destructuring could have side-effect"
    }
  }
}
```

## Expected Output
```javascript expected output
const [a, b, ] = anArray;
```
