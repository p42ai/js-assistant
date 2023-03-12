
## Input
```javascript input
(() => {
  function a() {
  }
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
  "0-34-CallExpression": {
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
  function a() {
  }
}
```
