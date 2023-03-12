
## Input
```javascript input
for (let i: number = 0; i < elements.length; i++) {
  let element: string = elements[i];
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
for (let element: string of elements) {
  console.log(element);
}
```
