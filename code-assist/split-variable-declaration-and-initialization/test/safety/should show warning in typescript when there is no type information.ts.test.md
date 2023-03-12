
## Input
```javascript input
let a = 123;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "3-11-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "no type annotation"
    }
  }
}
```

## Expected Output
```javascript expected output
let a;
a = 123;
```
