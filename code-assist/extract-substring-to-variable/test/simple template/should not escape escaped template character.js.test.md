
## Input
```javascript input
const a = `1\`\${234567\`\${90`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "12-14"
}
```

## Expected Output
```javascript expected output
const extractedText = `\``;
const a = `1${extractedText}\${234567\`\${90`;
```
