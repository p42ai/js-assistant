
Reason: _.each exits early when `false` is returned.

## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
_.each(input, (value) => value === 2);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
