
## Input
```javascript input
// comment 1
var value1 = 1,
    value2 = 2;
// comment 2
// comment 3
var value3 = 3,
    value4 = 4;
// comment 4
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
// comment 1
var value1 = 1;
var value2 = 2;
// comment 2
// comment 3
var value3 = 3;
var value4 = 4;
// comment 4
```
