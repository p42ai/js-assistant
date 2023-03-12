
## Input
```javascript input
(() => {
  var a = 3;
  console.log(a);
})();
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
  "0-44-CallExpression": {
    "safety": {
      "level": "WARNING",
      "message": "contains hoisted declarations"
    }
  }
}
```

## Expected Output
```javascript expected output
{
  var a = 3;
  console.log(a);
}
```
