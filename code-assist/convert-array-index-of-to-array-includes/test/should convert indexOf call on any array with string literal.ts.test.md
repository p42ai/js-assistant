
## Input
```javascript input
const a: Array<any> = [1, "2", 3];
a.indexOf("2") !== -1;
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
  "34-56-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const a: Array<any> = [1, "2", 3];
a.includes("2");
```
