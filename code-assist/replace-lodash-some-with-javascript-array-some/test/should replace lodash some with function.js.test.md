
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
const result = _.some(input, function(value) {
  return value === 1;
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const _ = require('lodash');

const input = [1, 2];
const result = input.some(function(value) {
  return value === 1;
});
```
