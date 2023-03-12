
## Input
```javascript input
let a = () => {
  return { v: "abc" };
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
let a = () => ({ v: "abc" });
```
