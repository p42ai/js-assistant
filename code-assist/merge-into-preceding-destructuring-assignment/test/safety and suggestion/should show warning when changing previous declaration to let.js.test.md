
## Input
```javascript input
const obj = { a: "1", b: "2" };
const { a } = obj;
let { b } = obj;
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
  "50-67-VariableStatement": {
    "safety": {
      "level": "WARNING",
      "message": "changes declaration to let"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "1", b: "2" };
let { a, b } = obj;
```
