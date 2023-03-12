
## Input
```javascript input
var value1 = 1, /* comment 1 */
    value2 = 2, // comment 2
    value3 = 3; /* comment 3 */ /* comment 4 */ // comment 5

console.log(value3);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
var value1 = 1; /* comment 1 */
var value2 = 2; // comment 2
var value3 = 3; /* comment 3 */ /* comment 4 */ // comment 5

console.log(value3);
```
