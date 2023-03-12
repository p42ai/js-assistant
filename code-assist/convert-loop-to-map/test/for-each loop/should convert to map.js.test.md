
## Input
```javascript input
const values = [];
elements.forEach((element) => {
  values.push(f(element));
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const values = elements.map((element) => {
  return f(element);
});
```
