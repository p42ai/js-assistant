
## Input
```javascript input
(function () { return { a: "b" }["a"]; });
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
(() => ({ a: "b" }["a"]));
```
