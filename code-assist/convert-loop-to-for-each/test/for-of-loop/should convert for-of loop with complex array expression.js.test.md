
## Input
```javascript input
for (const element of anObject.getElements()) {
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
anObject.getElements().forEach((element) => {
  console.log(element);
});
```
