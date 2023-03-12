
## Input
```javascript input
function f() {
  let value1 = 1,
      value2 = 2; // comment
  let value3 = 3,
      value4 = 4;
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
function f() {
  let value1 = 1;
  let value2 = 2; // comment
  let value3 = 3;
  let value4 = 4;
}
```
