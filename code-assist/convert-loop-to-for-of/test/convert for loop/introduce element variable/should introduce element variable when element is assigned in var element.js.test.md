
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  var element = elements[i];
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
for (const element2 of elements) {
  var element = element2;
  console.log(element);
}
```
