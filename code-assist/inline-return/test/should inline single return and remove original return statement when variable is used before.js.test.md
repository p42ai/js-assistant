
## Input
```javascript input
const q = () => {
  let a;
  a = f1();
  console.log(a);
  a = f2();
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
  a = f1();
  console.log(a);
  return f2();
};
```
