
## Input
```javascript input
function f() {
  const a = g(),
        b = h();
  return a;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "22-30-VariableDeclaration": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
  const b = h();
  return g();
}
```
