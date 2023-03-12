
Reason: _.each exits early when `false` is returned.

## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
_.each(input, function (value) {
    return value;
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
