
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  console.log("x");
  const element = elements[i];
  console.log(element);
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
for (const element of elements) {
  console.log("x");
  console.log(element);
}
```
