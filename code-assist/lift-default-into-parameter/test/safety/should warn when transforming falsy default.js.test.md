
## Input
```javascript input
f(function(a) {
  a = a || 2;
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
      "level": "WARNING",
      "message": "changes behavior for falsy values"
    }
  }
}
```

## Expected Output
```javascript expected output
f(function(a = 2) {
});
```
