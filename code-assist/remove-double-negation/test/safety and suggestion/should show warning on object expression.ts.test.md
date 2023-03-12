
## Input
```javascript input
function f(o?: X | Y): o is Y {
  return !!(o && 'a' in o);
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
  "40-58-PrefixUnaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "removes conversion to boolean"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f(o?: X | Y): o is Y {
  return o && 'a' in o;
}
```
