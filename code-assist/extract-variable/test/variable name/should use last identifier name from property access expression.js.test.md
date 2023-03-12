
## Input
```javascript input
a.b.x();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-3"
}
```

## Expected Output
```javascript expected output
const b = a.b;
b.x();
```
