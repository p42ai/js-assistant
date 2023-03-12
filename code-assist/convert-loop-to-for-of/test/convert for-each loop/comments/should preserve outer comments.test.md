
## Input
```javascript input
// leading comment
elements.forEach((element) => {
  console.log(element);
});
// trailing comment
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
// leading comment
for (const element of elements) {
  console.log(element);
}
// trailing comment
```
