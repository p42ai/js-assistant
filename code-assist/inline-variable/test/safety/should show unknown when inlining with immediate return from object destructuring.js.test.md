
## Input
```javascript input
function f() {
  const { a, b } = g();
  return a;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "25-25"
}
```

## Expected Matches
```json expected matches
{
  "24-26-BindingElement": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  const { b } = g();
  return g().a;
}
```
