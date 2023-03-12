
## Input
```javascript input
let c;
let s = `a` + c;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let c;
let s = `a${c}`;
```
