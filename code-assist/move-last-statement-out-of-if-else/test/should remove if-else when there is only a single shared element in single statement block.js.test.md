
## Input
```javascript input
if (x) {
  f();
} else {
  f();
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
  "0-33-IfStatement": {
    "suggestion": {
      "description": "You can remove the redundant if-else statement and replace it with its content.",
      "highlightRanges": ["0-33"]
    }
  }
}
```

## Expected Output
```javascript expected output
f();
```
