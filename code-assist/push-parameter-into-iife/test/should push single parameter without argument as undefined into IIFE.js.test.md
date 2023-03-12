
## Input
```javascript input
(function(a) {
  console.log(a);
})();
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
  const a = undefined;
  console.log(a);
})();
```
