

## Input
```javascript input
const element = "x";
for (let i = 0; i < elements.length; i++) {
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
const element = "x";
elements.forEach((element2, i) => {
  console.log(i);
});
```
