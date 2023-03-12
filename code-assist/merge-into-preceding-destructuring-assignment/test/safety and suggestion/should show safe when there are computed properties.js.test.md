
## Input
```javascript input
const obj = { a: "1", b: "2" };
const { [key1]: a } = obj;
const { [key2]: b } = obj;
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
  "58-85-VariableStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "1", b: "2" };
const { [key1]: a, [key2]: b } = obj;
```
