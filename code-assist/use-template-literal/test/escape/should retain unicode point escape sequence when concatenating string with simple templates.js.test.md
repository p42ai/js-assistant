
## Input
```javascript input
let a = '\u{123}' + `\u{234}` + `\u{345}`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = `\u{123}\u{234}\u{345}`;
```
