
## Input
```javascript input
function f() {
  var b = g();
  f("hello");
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
  "20-28-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "removes initializer with potential side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  f("hello");
}
```
