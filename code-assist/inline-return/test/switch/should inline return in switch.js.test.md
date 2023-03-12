
Note: let and return are kept, because there are several individual suggestions, each of which cannot remove them.

## Input
```javascript input
const q = () => {
  let a;
  switch (x) {
    case 1:
      a = f1();
      break;
    case 2:
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
    case 2:
      return f2();
  }
  return a;
};
```
