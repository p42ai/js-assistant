
Note: return is kept, because there is a different path to the return statement.

## Input
```javascript input
const q = () => {
  let a;
  if (x) {
    a = f();
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
  if (x) {
    return f();
  }
  return;
};
```
