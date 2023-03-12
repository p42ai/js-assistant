
## Input
```javascript input
const i = "123";
for (const element of elements) {
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
const i = "123";
for (let j = 0; j < elements.length; j++) {
  const element = elements[j];
  console.log(element);
}
```
