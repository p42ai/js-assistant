
## Input
```javascript input
function f() { // comment
  var value1 = 1,
      value2 = 2;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function f() { // comment
  var value1 = 1;
  var value2 = 2;
}
```
