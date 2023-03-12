
## Input
```javascript input
var b = g();
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
  "3-11-VariableDeclaration": {
    "suggestion": {
      "level": "WARNING",
      "message": "removes initializer with potential side-effects; could remove global variable"
    }
  }
}
```

## Expected Output
```javascript expected output
f("hello");
```
