
## Input
```javascript input
const a = void (function() {
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
const a = void "test";
```
