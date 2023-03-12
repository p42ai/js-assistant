
## Input
```javascript input
if (x) {
} else {
  g();
}
f();
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
  "0-26-IfStatement": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (!x) {
  g();
}
f();
```
