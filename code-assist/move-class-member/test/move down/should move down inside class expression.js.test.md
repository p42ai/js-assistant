
## Input
```javascript input
const C = class {
  property1;
  property2;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-20"
}
```

## Expected Output
```javascript expected output
const C = class {
  property2;
  property1;
}
```
