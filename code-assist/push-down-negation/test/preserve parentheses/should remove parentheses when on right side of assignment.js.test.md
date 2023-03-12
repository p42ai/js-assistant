
## Input
```javascript input
const a = !(b && c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = !b || !c;
```
