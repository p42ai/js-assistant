
## Input
```javascript input
const something = this.aProperty.something;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { something } = this.aProperty;
```
