
## Input
```javascript input
for (const element of elements) {
  console.log(element);
  const i = "123";
  const j = "123";
  const k = "123";
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
for (let i2 = 0; i2 < elements.length; i2++) {
  const element = elements[i2];
  console.log(element);
  const i = "123";
  const j = "123";
  const k = "123";
}
```
