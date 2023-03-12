
## Input
```javascript input
function f() {
  const a: Something = g(),
  return a;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "22-41-VariableDeclaration": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
  return g();
}
```
