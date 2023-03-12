
## Input
```javascript input
const a = `123${boundary2}456789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "26-32"
}
```

## Expected Output
```javascript expected output
const extractedText = `456789`;
const a = `123${boundary2}${extractedText}`;
```
