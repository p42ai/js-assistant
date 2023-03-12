
## Input
```javascript input
let x;
let a = `a${x}b` + `c${x}\u{123}`;
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
let a = `a${x}bc${x}\u{123}`;
```
