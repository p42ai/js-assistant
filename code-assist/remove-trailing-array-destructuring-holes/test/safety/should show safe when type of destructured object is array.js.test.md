
## Input
```javascript input
const anArray = [1, 2, 3, 4];
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
  "35-46-ArrayBindingPattern": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const anArray = [1, 2, 3, 4];
const [a, b, ] = anArray;
```
