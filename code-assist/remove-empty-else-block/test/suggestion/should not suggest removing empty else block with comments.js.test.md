
## Input
```javascript input
if (x) {
    f();
} else {
    // comment
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
  "0-43-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
if (x) {
    f();
}
```
