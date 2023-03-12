
## Input
```javascript input
const _ = require('lodash');

const undefined = "123";
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

const undefined = "123";
const result = array.map(() => void 0);
```
