
## Input
```javascript input
if (x) {
  throw "a" + x + "a";
}
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
if (x) {
  throw `a${x}a`;
}
let b = { value: `b${x}b` };
```
