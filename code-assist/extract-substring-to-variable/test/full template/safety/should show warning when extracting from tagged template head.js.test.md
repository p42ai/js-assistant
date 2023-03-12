
## Input
```javascript input
const a = tag`123456${boundary}789`;
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
  "13-22-TemplateHead": {
    "safety": {
      "level": "WARNING",
      "message": "can change tagged template parameter values"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `34`;
const a = tag`12${extractedText}56${boundary}789`;
```
