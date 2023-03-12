
## Input
```javascript input
const {
  a,
  aProperty: b,
  c,
} = anObject;
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
  "12-27-BindingElement": {
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
  c,
} = anObject;
doSomething(a, c);
```
