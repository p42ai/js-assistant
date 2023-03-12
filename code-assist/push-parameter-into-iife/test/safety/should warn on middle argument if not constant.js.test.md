
## Input
```javascript input
(function(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
})(alpha(), beta(), gamma());
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
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "changes execution order"
    }
  }
}
```

## Expected Output
```javascript expected output
(function(a, c) {
  const b = beta();
  console.log(a);
  console.log(b);
  console.log(c);
})(alpha(), gamma());
```
