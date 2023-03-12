
## Input
```javascript input
const a = tag`123${boundary2}456789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "31-33"
}
```

## Expected Matches
```json expected matches
{
  "28-36-TemplateTail": {
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
const a = tag`123${boundary2}45${extractedText}89`;
```
