
## Input
```javascript input
g(obj.f);
obj.f();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-7"
}
```

## Expected Matches
```json expected matches
{
  "2-7-PropertyAccessExpression": {
    "safety": {
      "level": "WARNING",
      "message": "changes 'this' in a method call to the global object"
    }
  }
}
```

## Expected Output
```javascript expected output
const f = obj.f;
g(f);
f();
```
