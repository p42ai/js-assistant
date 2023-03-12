
## Input
```javascript input
if (x) {
    f();
} else {
}
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
  "0-28-IfStatement": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (x) {
    f();
}
```
