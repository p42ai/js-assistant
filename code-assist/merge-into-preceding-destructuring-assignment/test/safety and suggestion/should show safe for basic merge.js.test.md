
## Input
```javascript input
const obj = { a: "abc", b: 123 };
const { a } = obj;
const { b } = obj;
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
  "52-71-VariableStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "abc", b: 123 };
const { a, b } = obj;
```
