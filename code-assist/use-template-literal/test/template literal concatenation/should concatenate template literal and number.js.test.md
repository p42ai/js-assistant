
TODO This can be simplified to `a${b}c2` (but need to check for octal escape sequences).

## Input
```javascript input
let b;
let s = `a${b}c` + 2;
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
let s = `a${b}c${2}`;
```
