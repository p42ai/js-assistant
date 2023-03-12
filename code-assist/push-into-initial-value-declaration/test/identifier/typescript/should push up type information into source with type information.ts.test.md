
## Input
```javascript input
const obj: string = something;
const aVariable: "123" = obj;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const aVariable: "123" = something;
```
