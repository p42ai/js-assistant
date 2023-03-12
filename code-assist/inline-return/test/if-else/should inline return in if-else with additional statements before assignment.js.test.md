
Note: let and return are kept, because there are 2 individual suggestions, each of which cannot remove them.

## Input
```javascript input
const q = () => {
  let a;
  console.log(0);
  if (x) {
    console.log(1);
    a = f1();
  } else {
    console.log(2);
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
  console.log(0);
  if (x) {
    console.log(1);
    return f1();
  } else {
    console.log(2);
    return f2();
  }
  return a;
};
```
