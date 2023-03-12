
## Input
```javascript input
let x, y;
a["a" + x] = 123;
a["b" + y] = 345;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let x, y;
a[`a${x}`] = 123;
a[`b${y}`] = 345;
```
