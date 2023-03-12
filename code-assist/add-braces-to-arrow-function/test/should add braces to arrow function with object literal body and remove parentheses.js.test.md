
## Input
```javascript input
let a = () => ({ x: "abc" });
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = () => {
  return { x: "abc" };
};
```
