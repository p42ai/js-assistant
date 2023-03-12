
## Input
```javascript input
var b;
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
  "3-5-VariableDeclaration": {
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
