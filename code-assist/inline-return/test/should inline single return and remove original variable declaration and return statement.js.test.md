
## Input
```javascript input
const q = () => {
  let a;
  a = f();
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
  return f();
};
```
