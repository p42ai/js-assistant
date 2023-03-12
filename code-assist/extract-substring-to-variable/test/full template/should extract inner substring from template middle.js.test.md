
## Input
```javascript input
const a = `1${boundary}2345678${boundary2}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "25-28"
}
```

## Expected Matches
```json expected matches
{
  "22-32-TemplateMiddle": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `456`;
const a = `1${boundary}23${extractedText}78${boundary2}9`;
```
