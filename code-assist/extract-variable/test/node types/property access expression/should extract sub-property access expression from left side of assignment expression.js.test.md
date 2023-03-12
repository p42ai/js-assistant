
## Input
```javascript input
a.x.prop = "1234";
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
const x = a.x;
x.prop = "1234";
```
