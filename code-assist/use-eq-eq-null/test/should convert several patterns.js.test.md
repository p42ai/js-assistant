
## Input
```javascript input
let a = x === null || x === undefined;
let b = x === null || x === undefined;
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
let b = x == null;
```
