
## Input
```javascript input
const a = tag`123456789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "19-21"
}
```

## Expected Matches
```json expected matches
{
  "13-24-NoSubstitutionTemplateLiteral": {
    "safety": {
      "level": "WARNING",
      "message": "can change tagged template parameter values"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `67`;
const a = tag`12345${extractedText}89`;
```
