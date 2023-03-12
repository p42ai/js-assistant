
## Input
```javascript input
var b = "hello";
f("hello");
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
  "3-15-VariableDeclaration": {
    "suggestion": {
      "description": "You can remove the unused variable 'b'."
    },
    "safety": {
      "level": "WARNING",
      "message": "could remove global variable"
    }
  }
}
```

## Expected Output
```javascript expected output
f("hello");
```
