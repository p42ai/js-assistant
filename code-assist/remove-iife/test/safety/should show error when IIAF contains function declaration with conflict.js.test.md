
## Input
```javascript input
const f = 1;
(() => {
  function f() {
    console.log("test");
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
  "12-72-CallExpression": {
    "safety": {
      "level": "ERROR",
      "message": "'f' is already declared in surrounding scope"
    }
  }
}
```

## Expected Output
```javascript expected output
const f = 1;
{
  function f() {
    console.log("test");
  }
}
```
