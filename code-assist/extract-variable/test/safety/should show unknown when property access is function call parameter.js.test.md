
## Input
```javascript input
g(obj.f);
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
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
const f = obj.f;
g(f);
```
