
## Input
```javascript input
function f(a: (x: any) => any) {
  a = a || (() => {});
  t(a);
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
function f(a: (x: any) => any = (() => {})) {
  t(a);
}
```
