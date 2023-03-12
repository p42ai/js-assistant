
## Input
```javascript input
const a = true;
const b =  false;
const x = !!(a && b);
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
  "43-54-PrefixUnaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const a = true;
const b =  false;
const x = a && b;
```
