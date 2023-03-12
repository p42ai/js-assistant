
## Input
```javascript input
const a = `123
456
790`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "14-19"
}
```

## Expected Output
```javascript expected output
const extractedText = `
456
`;
const a = `123${extractedText}790`;
```
