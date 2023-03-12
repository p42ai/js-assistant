
## Input
```javascript input
let v = !!(x && x.a != null);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let v = !!(x?.a != null);
```
