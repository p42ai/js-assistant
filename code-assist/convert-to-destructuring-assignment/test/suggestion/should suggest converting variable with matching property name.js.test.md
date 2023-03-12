

## Input
```javascript input
let something = anObject.something;
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
  "3-34-VariableDeclaration": {
    "suggestion": {
      "description": "You can use a destructuring assignment.",
      "highlightRanges": ["4-13", "24-34"]
    }
  }
}
```

## Expected Output
```javascript expected output
let { something } = anObject;
```
