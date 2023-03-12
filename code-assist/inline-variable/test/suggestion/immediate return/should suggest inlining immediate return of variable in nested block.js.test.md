
## Input
```javascript input
function f() {
  const something = x();
  {
    const a = g(something);
    return a;
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "54-54"
}
```

## Expected Matches
```json expected matches
{
  "53-70-VariableDeclaration": {
    "suggestion": {
      "description": "You can inline 1 occurrence of 'a' that is immediately returned."
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  const something = x();
  {
    return g(something);
  }
}
```
