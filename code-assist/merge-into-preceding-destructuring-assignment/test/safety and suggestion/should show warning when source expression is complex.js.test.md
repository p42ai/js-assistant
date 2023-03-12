
## Input
```javascript input
let { a } = obj.a;
let { b } = obj.a;
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
  "18-37-VariableStatement": {
    "safety": {
      "level": "WARNING",
      "message": "evaluates source expression only once"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
let { a, b } = obj.a;
```
