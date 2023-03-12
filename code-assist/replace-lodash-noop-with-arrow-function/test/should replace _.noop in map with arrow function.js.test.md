
## Input
```javascript input
const _ = require('lodash');

const result = array.map(_.noop);
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

const result = array.map(() => undefined);
```
