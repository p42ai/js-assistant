
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  let element = elements[i];
  element = "x";
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
for (let element of elements) {
  element = "x";
  console.log(element);
}
```
