
## Input
```javascript input
console.log(a);
export var a = 3;
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
  "26-32-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "removes export; var could be accessed before initialization"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(3);
```
