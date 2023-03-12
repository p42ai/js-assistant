
## Input
```javascript input
(() => {
  const f = () => {
    var a = 3;
    console.log(a);
  };
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
  "0-73-CallExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
{
  const f = () => {
    var a = 3;
    console.log(a);
  };
}
```
