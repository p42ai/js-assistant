
## Input
```javascript input
f(function(a) {
  a = a === undefined ? 2 : a;
});
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
  "11-12-Parameter": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
f(function(a = 2) {
});
```
