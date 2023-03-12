
## Input
```javascript input
const f = function (a, b) {
    return a + this.b;
}.bind(this);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = (a, b) => a + this.b;
```
