
## Input
```javascript input
const b = "123"
const a = b;
console.log(a);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "22-22"
}
```

## Expected Matches
```json expected matches
{
  "21-27-VariableDeclaration": {
    "suggestion": {
      "description": "You can inline 1 occurrence of 'a'."
    }
  }
}
```

## Expected Output
```javascript expected output
const b = "123"
console.log(b);
```
