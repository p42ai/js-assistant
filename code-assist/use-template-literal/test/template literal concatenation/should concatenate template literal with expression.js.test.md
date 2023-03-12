
## Input
```javascript input
let b, c;
let s = `a${b}c` + c;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let b, c;
let s = `a${b}c${c}`;
```
