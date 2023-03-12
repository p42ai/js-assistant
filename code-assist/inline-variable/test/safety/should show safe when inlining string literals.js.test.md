
## Input
```javascript input
const a = "3";
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
console.log("3");
```
