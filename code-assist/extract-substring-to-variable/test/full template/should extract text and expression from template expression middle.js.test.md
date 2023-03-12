
## Input
```javascript input
const a = `1${a}234${b}5678${c}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "18-24"
}
```

## Expected Output
```javascript expected output
const extractedText = `4${b}5`;
const a = `1${a}23${extractedText}678${c}9`;
```
