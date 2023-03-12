
## Input
```javascript input
console.log(a);
var a = 3;
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
  "19-25-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "var could be accessed before initialization; could remove global variable"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(3);
```
