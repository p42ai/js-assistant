
## Input
```javascript input
function f() { // comment
  var value1 = 1,
      value2 = 2;

  value2++;
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
  const value1 = 1;
  let value2 = 2;

  value2++;
}
```
