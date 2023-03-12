
## Input
```javascript input
let b = g();
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
      "description": "You can remove the unused variable 'b'.",
       "highlightRanges": ["4-5"]
    },
    "safety": {
      "level": "WARNING",
      "message": "removes initializer with potential side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
f("hello");
```
