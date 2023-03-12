
## Input
```javascript input
const a = "12🧑‍🤝‍🧑34";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-21"
}
```

## Expected Matches
```json expected matches
{
  "9-24-StringLiteral": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const extractedText = "🧑‍🤝‍🧑";
const a = `12${extractedText}34`;
```
