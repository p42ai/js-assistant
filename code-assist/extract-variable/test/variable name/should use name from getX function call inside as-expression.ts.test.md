
## Input
```javascript input
f(getRandom() as ObjectX);
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "2-24"
}
```

## Expected Output
```javascript expected output
const random = getRandom() as ObjectX;
f(random);
```
