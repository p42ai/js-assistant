
## Input
```javascript input
const x = value;
const a = x === null || x === undefined;
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
  "26-56-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
const a = x == null;
```
