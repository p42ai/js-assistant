
## Input
```javascript input
const { a: myVar1 } = obj;
const { a: myVar2 } = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { a: myVar1, a: myVar2 } = obj;
```
