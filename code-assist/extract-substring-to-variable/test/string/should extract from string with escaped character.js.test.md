
## Input
```javascript input
console.log("\"\r\n\b\f\t\v\0\\");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "15-31"
}
```

## Expected Output
```javascript expected output
const extractedText = "\r\n\b\f\t\v\0\\";
console.log(`\"${extractedText}`);
```
