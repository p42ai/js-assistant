
## Input
```javascript input
export const a = "test";
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
  "12-23-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "removes export"
    }
  }
}
```

## Expected Output
```javascript expected output
console.log("test");
```
