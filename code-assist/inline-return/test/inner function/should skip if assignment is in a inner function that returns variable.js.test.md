
## Input
```javascript input
const q = (x) => {
  let cachedValues;
  return (context) => {
    if (cachedValues == null) {
      cachedValues = source(context);
    }
    return cachedValues;
  };
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
