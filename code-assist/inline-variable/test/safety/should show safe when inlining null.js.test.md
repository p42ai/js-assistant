
## Input
```javascript input
const a = null;
console.log(a);
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
  "5-14-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(null);
```
