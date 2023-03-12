
## Input
```javascript input
const a = {
  f: function*(i) {
    yield i;
  }
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
const a = {
  * f(i) {
    yield i;
  }
};
```
