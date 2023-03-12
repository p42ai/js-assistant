
## Input
```javascript input
const a = tag`1${a}23${b1}4${b2}5${b3}678${c}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-39"
}
```

## Expected Matches
```json expected matches
{
  "13-47-TemplateExpression": {
    "safety": {
      "level": "WARNING",
      "message": "can change tagged template parameter values"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = `3${b1}4${b2}5${b3}6`;
const a = tag`1${a}2${extractedText}78${c}9`;
```
