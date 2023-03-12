
## Input
```javascript input
const _ = require('lodash');

const input = {
  a: 1,
  b: 2,
};

_.each(input, (value, index, context) => {
    console.log(value, index, context);
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
