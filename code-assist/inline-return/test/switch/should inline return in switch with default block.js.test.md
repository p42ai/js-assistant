
## Input
```javascript input
const q = () => {
  let a;
  switch (x) {
    case 1:
      a = f1();
      break;
    default:
      a = f2();
      break;
  }
  return a;
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const q = () => {
  let a;
  switch (x) {
    case 1:
      return f1();
    default:
      return f2();
  }
  return a;
};
```
