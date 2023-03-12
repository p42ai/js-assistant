
## Input
```javascript input
const value = !a ? x1 ? f1a() : f1b() : f2();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "14-14"
}
```

## Expected Matches
```json expected matches
{
  "13-44-ConditionalExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const value = a ? f2() : x1 ? f1a() : f1b();
```
