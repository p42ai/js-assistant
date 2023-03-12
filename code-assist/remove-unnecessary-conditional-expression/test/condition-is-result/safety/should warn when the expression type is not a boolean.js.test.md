
## Input
```javascript input
const x = a ? true : false;
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
  "9-26-ConditionalExpression": {
    "safety": {
      "level": "WARNING",
      "message": "removes conversion to boolean"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = a;
```
