
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
_.each(input, function (value) {
    console.log(value)
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
input.forEach(function (value) {
    console.log(value)
});
```
