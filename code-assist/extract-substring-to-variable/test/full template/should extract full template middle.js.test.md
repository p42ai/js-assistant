
## Input
```javascript input
const a = `1${boundary}2345678${boundary2}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "23-30"
}
```

## Expected Output
```javascript expected output
const extractedText = `2345678`;
const a = `1${boundary}${extractedText}${boundary2}9`;
```
