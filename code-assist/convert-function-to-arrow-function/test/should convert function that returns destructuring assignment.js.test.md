
## Input
```javascript input
(function () { return { a } = b; });
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
(() => ({ a } = b));
```
