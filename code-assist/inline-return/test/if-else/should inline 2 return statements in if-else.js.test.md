
Note: let and return are kept, because there are 2 individual suggestions, each of which cannot remove them.

## Input
```javascript input
const q = () => {
  let a;
  if (x) {
    a = f1();
  } else {
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
  let a;
  if (x) {
    return f1();
  } else {
    return f2();
  }
  return a;
};
```
