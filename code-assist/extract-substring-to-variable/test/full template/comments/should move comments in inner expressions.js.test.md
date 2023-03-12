
## Input
```javascript input
const a = `1${a}234${ /*comment1*/ b /*comment2*/ }5678${c}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "18-52"
}
```

## Expected Output
```javascript expected output
const extractedText = `4${ /*comment1*/ b /*comment2*/ }5`;
const a = `1${a}23${extractedText}678${c}9`;
```
