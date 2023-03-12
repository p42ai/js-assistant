
## Input
```javascript input
var value1 = 1, /* comment 1a */ /* comments 1b */
    value2 = 2, /* comment 2 */
    value3 = 3; /* comment 3 */ /* comment 4 */ // comment 5

value1++;
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
let value1 = 1; /* comment 1a */ /* comments 1b */
const value2 = 2; /* comment 2 */
let value3 = 3; /* comment 3 */ /* comment 4 */ // comment 5

value1++;
value3++;
```
