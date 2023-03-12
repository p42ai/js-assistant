
## Input
```javascript input
let b;
let s = `a${b}c` + `de`;
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
let s = `a${b}cde`;
```
