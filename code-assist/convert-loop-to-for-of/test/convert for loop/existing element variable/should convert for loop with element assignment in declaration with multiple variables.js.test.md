
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  const element = elements[i],
        b = "abc";
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
for (const element of elements) {
  const b = "abc";
  console.log(element);
}
```
