
## Input
```javascript input
f((await getRandom()) as ObjectX);
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "2-32"
}
```

## Expected Output
```javascript expected output
const random = (await getRandom()) as ObjectX;
f(random);
```
