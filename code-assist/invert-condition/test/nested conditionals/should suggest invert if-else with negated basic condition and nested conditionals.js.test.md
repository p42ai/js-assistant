
## Input
```javascript input
if (!a) {
  return x1 ? f1a() : f1b();
} else {
  return x2 ? f2a() : f2b();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-0"
}
```

## Expected Matches
```json expected matches
{
  "0-78-IfStatement": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
if (a) {
  return x2 ? f2a() : f2b();
} else {
  return x1 ? f1a() : f1b();
}
```
