
## Input
```javascript input
export function f1() {
  var a, b;
}

export async function f2() {
  var c, d;
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
export function f1() {
  var a;
  var b;
}

export async function f2() {
  var c;
  var d;
}
```
