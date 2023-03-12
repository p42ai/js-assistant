
## Input
```javascript input
function f() {
  const a = g(),
        b = h();
  return b;
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
  "31-47-VariableDeclaration": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function f() {
  const a = g();
  return h();
}
```
