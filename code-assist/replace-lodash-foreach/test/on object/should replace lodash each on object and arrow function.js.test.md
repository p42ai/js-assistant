
## Input
```javascript input
const _ = require('lodash');

const input = {
  a: 1,
  b: 2,
};

_.each(input, (value) => {
    console.log(value);
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
  "64-119-CallExpression": {
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "could change behavior for array-like objects"
    },
    "actionZones": [
      {
        "range": "66-119",
        "label": "Replace with Object.values(…).forEach"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const _ = require('lodash');

const input = {
  a: 1,
  b: 2,
};

Object.values(input).forEach((value) => {
    console.log(value);
});
```
