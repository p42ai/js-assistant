
## Input
```javascript input
let x;
let a = `\u{234}${x}\u{345}` + `\u{123}`;
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
let a = `\u{234}${x}\u{345}\u{123}`;
```
