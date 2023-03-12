
## Input
```javascript input
let s = "abcde";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "10-13"
}
```

## Expected Matches
```json expected matches
{
  "7-15-StringLiteral": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["10-13"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let s = `abcde`;
```
