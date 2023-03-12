
## Input
```javascript input
const a = `123456789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "16-18"
}
```

## Expected Matches
```json expected matches
{
  "9-21-NoSubstitutionTemplateLiteral": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `67`;
const a = `12345${extractedText}89`;
```
