
## Input
```javascript input
const [a, [b], c] = anArray;
doSomething(a, c);
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
  "11-12-BindingElement": {
    "suggestion": {
      "description": "You can remove the unused variable 'b'."
    },
    "safety": {
      "level": "WARNING",
      "message": "removes destructuring with potential side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
const [a, , c] = anArray;
doSomething(a, c);
```
