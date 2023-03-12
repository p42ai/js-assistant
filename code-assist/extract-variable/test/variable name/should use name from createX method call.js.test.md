
## Input
```javascript input
f(something.createRandom());
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-26"
}
```

## Expected Output
```javascript expected output
const random = something.createRandom();
f(random);
```
