
## Input
```javascript input
if (!a) {
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
  "0-36-IfStatement": {
    "suggestion": {
      "description": "You can invert the if-statement condition '!a' and swap the if- and else-blocks.",
      "highlightRanges": ["4-6"]
    }
  }
}
```

## Expected Output
```javascript expected output
if (a) {
  f(2);
} else {
  f(1);
}
```
