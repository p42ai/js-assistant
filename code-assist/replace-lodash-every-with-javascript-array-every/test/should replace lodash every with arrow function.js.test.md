
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
const result = _.every(input, (value) => value === 2);
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
const result = input.every((value) => value === 2);
```
