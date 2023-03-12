
## Input
```javascript input
const a = `123${boundary2}456789`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-30"
}
```

## Expected Matches
```json expected matches
{
  "25-33-TemplateTail": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `67`;
const a = `123${boundary2}45${extractedText}89`;
```
