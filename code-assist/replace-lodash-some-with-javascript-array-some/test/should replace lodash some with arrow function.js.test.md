
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
const result = _.some(input, (value) => value === 2);
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
const result = input.some((value) => value === 2);
```
