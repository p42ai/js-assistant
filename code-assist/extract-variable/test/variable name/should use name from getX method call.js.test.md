
## Input
```javascript input
f(something.getRandom());
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-23"
}
```

## Expected Output
```javascript expected output
const random = something.getRandom();
f(random);
```
