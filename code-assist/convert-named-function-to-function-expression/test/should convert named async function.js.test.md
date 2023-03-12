
## Input
```javascript input
async function f() {
    return Promise.resolve();
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
const f = async function() {
    return Promise.resolve();
};
```
