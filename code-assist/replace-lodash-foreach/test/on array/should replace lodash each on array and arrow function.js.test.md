
## Input
```javascript input
const _ = require('lodash');

const input = [1, 2];
_.each(input, (value) => {
    console.log(value)
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
  "51-104-CallExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can replace _.each (Lodash) with Array.forEach."
    }
  }
}
```

## Expected Output
```javascript expected output
const _ = require('lodash');

const input = [1, 2];
input.forEach((value) => {
    console.log(value)
});
```
