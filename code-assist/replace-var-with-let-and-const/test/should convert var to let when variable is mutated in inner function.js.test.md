
## Input
```javascript input
var shouldBeLet = 0;
function mutate() {
  shouldBeLet = 1;
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
let shouldBeLet = 0;
function mutate() {
  shouldBeLet = 1;
}
```
