
## Input
```javascript input
var value1 = 1, // comment 1
    value2 = 2, // comment 2
    value3 = 3; // comment 3

// unrelated comment
console.log("");

value3++;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const value1 = 1, // comment 1
    value2 = 2; // comment 2
let value3 = 3; // comment 3

// unrelated comment
console.log("");

value3++;
```
