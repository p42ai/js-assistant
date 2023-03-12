
## Input
```javascript input
var [first, ...rest] = arr;
first.m1();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const [first, ...rest] = arr;
first.m1();
```
