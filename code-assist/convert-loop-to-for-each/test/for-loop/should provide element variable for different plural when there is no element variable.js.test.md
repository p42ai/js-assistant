

## Input
```javascript input
for (let i = 0; i < items.length; i++) {
  console.log(i);
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
items.forEach((item, i) => {
  console.log(i);
});
```
