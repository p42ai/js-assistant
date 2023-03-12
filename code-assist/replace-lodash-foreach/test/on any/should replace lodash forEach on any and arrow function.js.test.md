
## Input
```javascript input
const _ = require('lodash');

function f(input) {
  _.forEach(input, (value) => {
      console.log(value)
  });
}
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
  "49-111-CallExpression": {
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "only use for arrays"
    },
    "actionZones": [
      {
        "range": "52-61",
        "label": "Replace with Array.forEach"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const _ = require('lodash');

function f(input) {
  input?.forEach((value) => {
      console.log(value)
  });
}
```
