
## Input
```javascript input
function f() {
  const a: string = '123';
  return a;
}
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
  "22-40-VariableDeclaration": {
    "safety": {
      "level": "INFORMATION",
      "message": "removes type"
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  return '123';
}
```
