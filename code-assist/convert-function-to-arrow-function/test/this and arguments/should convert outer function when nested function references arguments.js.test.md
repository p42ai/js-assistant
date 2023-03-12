
## Input
```javascript input
const f = function () {
    return function () { arguments[0](); }
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = () => function () { arguments[0](); };
```
