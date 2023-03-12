
## Input
```javascript input
const a = NaN;
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
  "5-13-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log(NaN);
```
