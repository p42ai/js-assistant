
## Input
```javascript input
const a = 12;
(function(a) {
  console.log(a);
})(a);
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
  "24-25-Parameter": {
    "suggestion": null,
    "safety": {
      "level": "ERROR",
      "message": "'a' is used in argument"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = 12;
(function() {
  const a = a;
  console.log(a);
})();
```
