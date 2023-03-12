
## Input
```javascript input
const extractedText = 123;
const a = "123456790";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "41-44"
}
```

## Expected Output
```javascript expected output
const extractedText = 123;
const extractedText2 = "456";
const a = `123${extractedText2}790`;
```
