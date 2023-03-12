
## Input
```javascript input
let a = 0;
if (condition) {
  a = 1;
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
  "10-38-IfStatement": {
    "suggestion": {
      "description": "You can use a conditional expression to initialize the variable.",
      "highlightRanges": [
        "4-9",
        "11-38"
      ]
    }
  }
}
```

## Expected Output
```javascript expected output
let a = condition ? 1 : 0;
```
