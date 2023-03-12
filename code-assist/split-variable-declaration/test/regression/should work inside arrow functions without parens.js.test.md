
## Input
```javascript input
var a, b;

f(t => {
  var c, d;
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var a;
var b;

f(t => {
  var c;
  var d;
});
```
