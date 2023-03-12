
## Input
```javascript input
f(anArray.length);
{
  const anArray = []; // shadowing
  g(anArray.length);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-16"
}
```

## Expected Output
```javascript expected output
const length = anArray.length;
f(length);
{
  const anArray = []; // shadowing
  g(anArray.length);
}
```
