
## Input
```javascript input
const _ = require('lodash');

_.filter(myArray, (element) => element > 10);
```

## Expected Augmentation
```json expected augmentations
{
  "28-74-CallExpression": {
    "match": true,
    "captures": {
      "name": "filter",
      "propertyAccess": "28-38-PropertyAccessExpression"
    }
  }
}
```