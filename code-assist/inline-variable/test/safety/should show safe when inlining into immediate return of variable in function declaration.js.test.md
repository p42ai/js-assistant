
## Input
```javascript input
function f() {
  const a = g();
  return a;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "23-23"
}
```

## Expected Matches
```json expected matches
{
  "22-30-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  return g();
}
```
