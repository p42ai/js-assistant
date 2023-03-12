
## Input
```javascript input
// loop 1:
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  console.log(element);
}

// loop 2:
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
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
// loop 1:
for (const element of elements) {
  console.log(element);
}

// loop 2:
for (const element of elements) {
  console.log(element);
}
```
