
## Input
```javascript input
let a;
a = 123;
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
  "3-5-VariableDeclaration": {
    "suggestion": {
      "description": "You can merge the initial assignment into the declaration of 'a'.",
      "highlightRanges": ["4-5", "7-14"]
    }
  }
}
```

## Expected Output
```javascript expected output
let a = 123;
```
