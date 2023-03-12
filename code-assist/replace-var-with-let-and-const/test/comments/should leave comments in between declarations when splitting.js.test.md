
## Input
```javascript input
var value1 = 1,
    // comment
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
const value1 = 1;
// comment
let value2 = 2;

value2++;
```
