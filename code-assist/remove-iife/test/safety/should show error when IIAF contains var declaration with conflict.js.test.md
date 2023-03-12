
## Input
```javascript input
const a = 1;
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
  "12-57-CallExpression": {
    "safety": {
      "level": "ERROR",
      "message": "'a' is already declared in surrounding scope"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = 1;
{
  var a = 3;
  console.log(a);
}
```
