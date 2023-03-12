
## Input
```javascript input
if (a != null) {
  f(1);
} else {
  f(2);
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
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (a == null) {
  f(2);
} else {
  f(1);
}
```
