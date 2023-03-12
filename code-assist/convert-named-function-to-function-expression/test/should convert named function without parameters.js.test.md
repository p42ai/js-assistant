
## Input
```javascript input
function f() {
    console.log("test");
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
const f = function() {
    console.log("test");
};
```
