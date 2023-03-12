
## Input
```javascript input
if (a !== 2) {
  f(1);
}
f(2);
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
  "0-24-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
if (a === 2) {
} else {
  f(1);
}
f(2);
```
