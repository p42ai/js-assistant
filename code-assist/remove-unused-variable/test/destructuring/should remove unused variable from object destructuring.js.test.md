
## Input
```javascript input
const {
  a,
  b,
  c
} = f();
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
  "17-21-BindingElement": {
    "safety": {
      "level": "WARNING",
      "message": "removes destructuring with potential side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
const {
  a,
  b,
} = f();
doSomething(a, b);
```
