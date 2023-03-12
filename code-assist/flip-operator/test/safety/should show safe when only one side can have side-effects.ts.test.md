
## Input
```javascript input
const numbers = [1, 2, 3, 4];
const x = numbers.indexOf(2) !== -1;
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
  "39-65-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const numbers = [1, 2, 3, 4];
const x = -1 !== numbers.indexOf(2);
```
