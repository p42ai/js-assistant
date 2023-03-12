
## Input
```javascript input
(function(a) {
  console.log(a);
})(12);
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
  "10-11-Parameter": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
(function() {
  const a = 12;
  console.log(a);
})();
```
