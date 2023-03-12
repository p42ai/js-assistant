
## Input
```javascript input
const [value] = anArray,
      [value2] = anotherArray;
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
  "5-23-VariableDeclaration": {
    "applicationResult": "applied"
  },
  "24-54-VariableDeclaration": {
    "applicationResult": "rejected/conflict"
  }
}
```

## Expected Output
```javascript expected output
const value = anArray[0],
      [value2] = anotherArray;
```
