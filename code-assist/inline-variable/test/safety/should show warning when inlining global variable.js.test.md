
## Input
```javascript input
const a = b;
console.log(a);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"
}
```

## Expected Matches
```json expected matches
{
  "5-11-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "'b' is global and could be modified"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(b);
```
