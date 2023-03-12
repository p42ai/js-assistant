
## Input
```javascript input
if (a !== b) {
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
  "0-41-IfStatement": {
    "suggestion": {
      "description": "You can invert the if-statement condition 'a !== b' and swap the if- and else-blocks.",
      "highlightRanges": ["4-11"]
    }
  }
}
```

## Expected Output
```javascript expected output
if (a === b) {
  f(2);
} else {
  f(1);
}
```
