
## Input
```javascript input
const x = (a ? true : false) ? p : q;
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
  "11-27-ConditionalExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = (a) ? p : q;
```
