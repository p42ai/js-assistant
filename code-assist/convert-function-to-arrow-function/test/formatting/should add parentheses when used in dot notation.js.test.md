
## Input
```javascript input
f(function (a) { return a; }.length);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f(((a) => a).length);
```
