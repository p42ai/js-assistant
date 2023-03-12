
## Input
```javascript input
const q = () => {
  let a;
  switch (x) {
    case 1:
      a = f1();
      break;
    case 2:
      somethingElse();
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
  switch (x) {
    case 1:
      return f1();
    case 2:
      somethingElse();
      break;
  }
  return;
};
```
