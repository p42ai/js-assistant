
## Input
```javascript input
let a = someCalculation();
if (condition) {
  a = 1;
}
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
  "26-54-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "changes initializer calls"
    }
  }
}
```

## Expected Output
```javascript expected output
let a = condition ? 1 : someCalculation();
```
