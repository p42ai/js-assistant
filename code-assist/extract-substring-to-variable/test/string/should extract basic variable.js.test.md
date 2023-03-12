
## Input
```javascript input
const a = "123456790";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "14-17"
}
```

## Expected Matches
```json expected matches
{
  "9-21-StringLiteral": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = "456";
const a = `123${extractedText}790`;
```
