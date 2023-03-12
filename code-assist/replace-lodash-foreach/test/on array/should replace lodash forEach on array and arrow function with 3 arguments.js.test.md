
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
_.forEach(input, (value, index, collection) => {
    console.log(value, index, collection)
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "51-145-CallExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can replace _.forEach (Lodash) with Array.forEach."
    }
  }
}
```

## Expected Output
```javascript expected output
const _ = require('lodash');

const input = [1, 2];
input.forEach((value, index, collection) => {
    console.log(value, index, collection)
});
```
