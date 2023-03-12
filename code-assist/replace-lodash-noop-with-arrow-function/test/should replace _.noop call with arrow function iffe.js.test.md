
## Input
```javascript input
const _ = require('lodash');

const result = _.noop();
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

const result = (() => undefined)();
```
