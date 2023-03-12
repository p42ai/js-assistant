
## Input
```javascript input
const a = "123456790";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "18-20"
}
```

## Expected Output
```javascript expected output
const extractedText = "90";
const a = `1234567${extractedText}`;
```
