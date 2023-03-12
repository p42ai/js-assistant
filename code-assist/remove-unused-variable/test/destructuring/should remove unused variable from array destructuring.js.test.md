
## Input
```javascript input
const [a, b, c] = anArray;
doSomething(a, b);
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
  "12-14-BindingElement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the unused variable 'c'."
    }
  }
}
```

## Expected Output
```javascript expected output
const [a, b,] = anArray;
doSomething(a, b);
```
