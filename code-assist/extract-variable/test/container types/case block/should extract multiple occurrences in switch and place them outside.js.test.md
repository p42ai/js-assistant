
## Input
```javascript input
let target;
switch (aValue) {
  case 1:
    target = someFunction();
    break;
  case 2:
    target = someFunction();
    break;
  case 3:
    target = "abc";
    break;
  default:
    target = someFunction();
    break;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "53-67"
}
```

## Expected Output
```javascript expected output
let target;
const newVariable = someFunction();
switch (aValue) {
  case 1:
    target = newVariable;
    break;
  case 2:
    target = newVariable;
    break;
  case 3:
    target = "abc";
    break;
  default:
    target = newVariable;
    break;
}
```
