
## Input
```javascript input
f(await something.createRandom());
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-32"
}
```

## Expected Output
```javascript expected output
const random = await something.createRandom();
f(random);
```
