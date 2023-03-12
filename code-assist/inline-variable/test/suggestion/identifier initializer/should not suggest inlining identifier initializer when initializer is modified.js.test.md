
## Input
```javascript input
let b = "123"
const a = b;
b = "234";
console.log(a);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-20"
}
```

## Expected Matches
```json expected matches
{
  "19-25-VariableDeclaration": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
let b = "123"
b = "234";
console.log(b);
```
