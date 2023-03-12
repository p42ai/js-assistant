
## Input
```javascript input
const q = () => {
  let q;
  let a;
  switch (x) {
    case 1:
      a = f1();
      break;
    case 3:
      q = someUnrelatedCall();
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
  let q;
  switch (x) {
    case 1:
      return f1();
    case 3:
      q = someUnrelatedCall();
      break;
  }
  return;
};
```
