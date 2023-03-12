
## Input
```javascript input
class C {
  m() {
    const a = g();
    return a;
  }
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
  "27-35-VariableDeclaration": {
    "suggestion": {
      "description": "You can inline 1 occurrence of 'a' that is immediately returned."
    }
  }
}
```

## Expected Output
```javascript expected output
class C {
  m() {
    return g();
  }
}
```
