
## Input
```javascript input
let a = x?.();
f(a);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f(x?.());
```
