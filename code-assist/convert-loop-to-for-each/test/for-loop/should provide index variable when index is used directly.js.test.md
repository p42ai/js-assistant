
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  console.log(i);
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
elements.forEach((element, i) => {
  console.log(i);
  console.log(element);
});
```
