
## Input
```javascript input
let a = `\u{234}` + '\u{123}';
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = `\u{234}\u{123}`;
```
