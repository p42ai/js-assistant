
## Input
```javascript input
const [a, [c, , ], b] = anArray;
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
  "9-17-ArrayBindingPattern": {
    "safety": {
      "level": "WARNING",
      "message": "destructuring could have side-effect"
    }
  }
}
```

## Expected Output
```javascript expected output
const [a, [c, ], b] = anArray;
```
