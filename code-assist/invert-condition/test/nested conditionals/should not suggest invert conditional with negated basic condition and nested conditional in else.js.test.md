
## Input
```javascript input
const value = !a ? f1() : x1 ? f2a() : f2b();
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
const value = a ? x1 ? f2a() : f2b() : f1();
```
