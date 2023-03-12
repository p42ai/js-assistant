
## Input
```javascript input
function f() {
  var b = "hello";
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
  "20-32-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the unused variable 'b'."
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
