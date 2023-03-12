
## Input
```javascript input
var x;
let s = "a\` \\` \\\` " + x;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var x;
let s = `a\` \\\` \\\` ${x}`;
```
