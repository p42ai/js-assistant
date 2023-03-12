
## Input
```javascript input
var value1 = 1, /* comment 1a */ /* comment 1b */
    value2 = 2, /* comment 2a */ // comment 2b
    value3 = 3; /* comment 3 */

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
const value1 = 1, /* comment 1a */ /* comment 1b */
    value2 = 2; /* comment 2a */ // comment 2b
let value3 = 3; /* comment 3 */

value3++;
```
