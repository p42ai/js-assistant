
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
const result = _.map(input, function(value) {
  return value * 2;
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
const result = input.map(function(value) {
  return value * 2;
});
```
