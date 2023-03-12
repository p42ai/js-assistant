
## Input
```javascript input
const a = tag`1${boundary}2345678${boundary2}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-31"
}
```

## Expected Matches
```json expected matches
{
  "25-35-TemplateMiddle": {
    "safety": {
      "level": "WARNING",
      "message": "can change tagged template parameter values"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `456`;
const a = tag`1${boundary}23${extractedText}78${boundary2}9`;
```
