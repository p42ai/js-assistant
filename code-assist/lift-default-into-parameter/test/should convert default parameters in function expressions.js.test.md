
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

## Expected Output
```javascript expected output
f(function(a = 2) {
});
```
