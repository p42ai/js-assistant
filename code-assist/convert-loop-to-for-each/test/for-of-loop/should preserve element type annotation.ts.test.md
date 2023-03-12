
## Input
```javascript input
for (const element: ElementType of elements) {
  console.log(element);
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
elements.forEach((element: ElementType) => {
  console.log(element);
});
```
