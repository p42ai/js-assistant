
## Input
```javascript input
let x;
let a = { value: "a" + x + "a" };
let b = { value: "b" + x + "b" };
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let x;
let a = { value: `a${x}a` };
let b = { value: `b${x}b` };
```
