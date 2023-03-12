
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  console.log(elements[i]);
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
  console.log(element);
}
```
