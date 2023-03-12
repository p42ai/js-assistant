
## Input
```javascript input
const a = x 
    ? 1 
    : 2;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = !x 
    ? 2 
    : 1;
```
