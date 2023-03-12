
## Input
```javascript input
var name;
if (!a[(name = b())]) {
  a[name] = c;
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
let name;
if (!a[(name = b())]) {
  a[name] = c;
}
```
