
## Input
```javascript input
let b;
let s = `a${b}c` + `d${b}e`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let b;
let s = `a${b}cd${b}e`;
```
