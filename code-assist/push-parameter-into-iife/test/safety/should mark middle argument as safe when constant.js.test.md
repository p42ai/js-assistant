
## Input
```javascript input
(function(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
})(alpha(), "a", gamma());
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
(function(a, c) {
  const b = "a";
  console.log(a);
  console.log(b);
  console.log(c);
})(alpha(), gamma());
```
