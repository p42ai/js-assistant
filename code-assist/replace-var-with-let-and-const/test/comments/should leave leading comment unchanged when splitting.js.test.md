
## Input
```javascript input
// comment
var value1 = 1,
    value2 = 2;

value2++;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
// comment
const value1 = 1;
let value2 = 2;

value2++;
```
