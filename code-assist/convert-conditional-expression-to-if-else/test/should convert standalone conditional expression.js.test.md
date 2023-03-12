
## Input
```javascript input
x ? f() : g();
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
  "0-14-ExpressionStatement": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (x) {
  f();
} else {
  g();
}
```
