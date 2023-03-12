
## Input
```javascript input
const f = function() {
  console.log("A");
  return function() {
    f2("a");
  };
};
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
  "9-84-FunctionExpression": {
    "applicationResult": "applied"
  },
  "51-81-FunctionExpression": {
    "applicationResult": "rejected/conflict"
  }
}
```

## Expected Output
```javascript expected output
const f = () => {
  console.log("A");
  return function() {
    f2("a");
  };
};
```
