
## Input
```javascript input
const obj: string = something;
const aVariable = obj;
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
