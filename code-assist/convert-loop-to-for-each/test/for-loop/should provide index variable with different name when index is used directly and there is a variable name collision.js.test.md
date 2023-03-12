
## Input
```javascript input
const i = "test";
for (let j = 0; j < elements.length; j++) {
  const element = elements[j];
  console.log(j);
  console.log(element);
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
const i = "test";
elements.forEach((element, j) => {
  console.log(j);
  console.log(element);
  console.log(i);
});
```
