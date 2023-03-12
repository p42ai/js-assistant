
## Input
```javascript input
function f() {
  const a = g();
  return a;
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
  "22-30-VariableDeclaration": {
    "suggestion": {
      "description": "You can inline 1 occurrence of 'a' that is immediately returned.",
      "highlightRanges": ["23-24", "41-42"]
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  return g();
}
```
