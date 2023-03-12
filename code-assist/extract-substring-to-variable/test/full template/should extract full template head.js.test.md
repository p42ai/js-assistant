
## Input
```javascript input
const a = `123456${boundary}789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "11-17"
}
```

## Expected Output
```javascript expected output
const extractedText = `123456`;
const a = `${extractedText}${boundary}789`;
```
