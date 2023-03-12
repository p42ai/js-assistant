
## Input
```javascript input
function f(anArray: string[]) {
  const [a, b, , ] = anArray;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "39-50-ArrayBindingPattern": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(anArray: string[]) {
  const [a, b, ] = anArray;
}
```
