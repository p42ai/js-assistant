
## Input
```javascript input
const o = {
  ["" + "x"]: "a",
};
const b = "a" + "b"; // dummy
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const o = {
  ["x"]: "a",
};
const b = "ab"; // dummy
```
