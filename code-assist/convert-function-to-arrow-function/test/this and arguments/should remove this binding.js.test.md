
## Input
```javascript input
const f = function () {}.bind(this);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = () => {};
```
