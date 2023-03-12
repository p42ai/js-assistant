
## Input
```javascript input
const q = () => {
  let a;
  switch (x) {
    case 1:
      somethingElse();
      break;
    case 2:
      a = f2();
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
      somethingElse();
      break;
    case 2:
      return f2();
  }
  return;
};
```
