
## Input
```javascript input
var b = "hello";
f("hello");
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
  "3-15-VariableDeclaration": {
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
f("hello");
```
