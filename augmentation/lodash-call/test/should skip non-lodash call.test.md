
## Input
```javascript input
const _ = require('lodash');

myArray.filter((element) => element > 10);
```

## Expected Augmentation
```json expected augmentations
{
  "28-71-CallExpression": {
    "match": false
  }
}
```