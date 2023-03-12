
## Input
```javascript input
let b;
let s = "de" + `a${b}c`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let b;
let s = `dea${b}c`;
```
