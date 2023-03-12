
## Input
```javascript input
const a = `123${a}456${b}789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-19"
}
```

## Expected Output
```javascript expected output
const extractedText = `3${a}4`;
const a = `12${extractedText}56${b}789`;
```
