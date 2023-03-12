
Note: let and return are kept, because there are several individual suggestions, each of which cannot remove them.

## Input
```javascript input
const q = () => {
  let a;
  if (x) {
    a = f1();
  } else if (y) {
    a = f2();
  } else {
    a = f3();
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
  if (x) {
    return f1();
  } else if (y) {
    return f2();
  } else {
    return f3();
  }
  return a;
};
```
