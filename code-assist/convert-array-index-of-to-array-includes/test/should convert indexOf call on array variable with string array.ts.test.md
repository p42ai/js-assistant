
## Input
```javascript input
const a: string[] = ["1", "2", "3"];
a.indexOf(c) !== -1;
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
  "36-56-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const a: string[] = ["1", "2", "3"];
a.includes(c);
```
