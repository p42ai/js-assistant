
## Input
```javascript input
let a = null === x || undefined === x;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = x == null;
```
