
## Input
```javascript input
const a = `123456${boundary}789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-15"
}
```

## Expected Matches
```json expected matches
{
  "9-19-TemplateHead": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `34`;
const a = `12${extractedText}56${boundary}789`;
```
