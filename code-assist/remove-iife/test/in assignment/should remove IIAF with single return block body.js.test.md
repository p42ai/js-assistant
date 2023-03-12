
## Input
```javascript input
const a = (() => {
    return "test";
})();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = "test";
```
