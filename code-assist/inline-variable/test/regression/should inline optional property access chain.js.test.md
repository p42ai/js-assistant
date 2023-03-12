
## Input
```javascript input
let a = obj?.property;
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
f(obj?.property);
```
