
## Input
```javascript input
const a = `123${a}456${b}789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-26"
}
```

## Expected Output
```javascript expected output
const extractedText = `6${b}7`;
const a = `123${a}45${extractedText}89`;
```
