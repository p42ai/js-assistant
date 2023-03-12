

## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  console.log(i);
  console.log(element); // global
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
elements.forEach((element2, i) => {
  console.log(i);
  console.log(element); // global
});
```
