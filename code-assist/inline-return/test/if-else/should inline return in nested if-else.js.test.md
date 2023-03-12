
Note: let and return are kept, because there are several individual suggestions, each of which cannot remove them.

## Input
```javascript input
const q = () => {
  let a;
  if (x) {
    if (y1) {
      a = f1();
    } else {
      a = f2();
    }
  } else {
    if (y2) {
      a = f3();
    } else {
      a = f4();
    }
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
    if (y1) {
      return f1();
    } else {
      return f2();
    }
  } else {
    if (y2) {
      return f3();
    } else {
      return f4();
    }
  }
  return a;
};
```
