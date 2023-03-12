
## Input
```javascript input
(function(a, b) {
  console.log(a);
  console.log(b);
})(12, 23);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-13"
}
```

## Expected Matches
```json expected matches
{
  "12-14-Parameter": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
(function(a) {
  const b = 23;
  console.log(a);
  console.log(b);
})(12);
```
