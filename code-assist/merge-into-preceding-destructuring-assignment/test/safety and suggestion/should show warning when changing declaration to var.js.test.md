
## Input
```javascript input
const obj = { a: "1", b: "2" };
var { a } = obj;
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
  "48-65-VariableStatement": {
    "safety": {
      "level": "WARNING",
      "message": "changes declaration to var"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "1", b: "2" };
var { a, b } = obj;
```
