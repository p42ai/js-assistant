
## Input
```javascript input
{
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
  "7-19-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "could remove global variable"
    }
  }
}
```

## Expected Output
```javascript expected output
{
  f("hello");
}
```
