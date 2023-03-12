
## Input
```javascript input
const f1 = a || (function () { return 'x'; });
const f2 = a + (function () { return 0; });
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f1 = a || (() => 'x');
const f2 = a + (() => 0);
```
