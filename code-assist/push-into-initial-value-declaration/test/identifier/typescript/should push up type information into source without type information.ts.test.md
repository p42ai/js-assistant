
## Input
```javascript input
const obj = something;
const aVariable: string = obj;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const aVariable: string = something;
```
