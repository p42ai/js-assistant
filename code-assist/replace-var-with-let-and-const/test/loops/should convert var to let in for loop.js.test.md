
## Input
```javascript input
var ret = "";
for (var i = 0, j = context.length; i < j; i++) {
  ret = ret + options.fn(context[i]);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let ret = "";
for (let i = 0, j = context.length; i < j; i++) {
  ret = ret + options.fn(context[i]);
}
```
