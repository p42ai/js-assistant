
## Input
```javascript input
let a = new O("a" + x + "a");
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
let a = new O(`a${x}a`);
let b = { value: `b${x}b` };
```
