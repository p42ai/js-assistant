
## Input
```javascript input
let s = '`' + `\`` + `a${a}`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let s = `\`\`a${a}`;
```
