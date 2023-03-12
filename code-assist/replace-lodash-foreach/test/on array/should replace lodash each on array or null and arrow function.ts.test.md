
## Input
```javascript input
const _ = require('lodash');

function f(input: number[] | null) {
  _.each(input, (value) => {
      console.log(value)
  });
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "66-125-CallExpression": {
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

function f(input: number[] | null) {
  input?.forEach((value) => {
      console.log(value)
  });
}
```
