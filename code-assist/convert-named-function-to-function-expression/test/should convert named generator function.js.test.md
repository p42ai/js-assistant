
## Input
```javascript input
function* generator(i) {
  yield i;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const generator = function*(i) {
  yield i;
};
```
