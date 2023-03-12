
## Input
```javascript input
console.log(a);
var a = 3;
```

## Configuration
```json configuration
{
  "extension": "cjs"
}
```

## Expected Matches
```json expected matches
{
  "19-25-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "var could be accessed before initialization"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(3);
```
