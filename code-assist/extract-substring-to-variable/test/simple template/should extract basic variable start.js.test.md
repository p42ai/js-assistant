
## Input
```javascript input
const a = `123456790`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "11-14"
}
```

## Expected Output
```javascript expected output
const extractedText = `123`;
const a = `${extractedText}456790`;
```
