
## Input
```javascript input
export default function() {
  var a, b;
}

function f2() {
  var a, b;
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
export default function() {
  var a;
  var b;
}

function f2() {
  var a;
  var b;
}
```
