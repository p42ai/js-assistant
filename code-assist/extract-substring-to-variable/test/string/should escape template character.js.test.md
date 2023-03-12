
## Input
```javascript input
const a = "1`${234567`${90";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "17-20"
}
```

## Expected Output
```javascript expected output
const extractedText = "456";
const a = `1\`\${23${extractedText}7\`\${90`;
```
