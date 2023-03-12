
## Input
```javascript input
let a = 4,
    b = "abc",
    c = 5;

f(a + c);
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
  "10-24-VariableDeclaration": {
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
let a = 4,
    c = 5;

f(a + c);
```
