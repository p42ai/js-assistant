
## Input
```javascript input
let a = "abc";
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
  "3-13-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the unused variable 'a'."
    }
  }
}
```

## Expected Output
```javascript expected output
f("hello");
```
