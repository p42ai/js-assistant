
## Input
```javascript input
for (const element of anObject.elements()) {
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
for (let i = 0; i < anObject.elements().length; i++) {
  const element = anObject.elements()[i];
  console.log(element);
}
```
