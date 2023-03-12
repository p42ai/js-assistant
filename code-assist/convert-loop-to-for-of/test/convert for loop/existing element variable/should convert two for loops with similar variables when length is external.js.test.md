
## Input
```javascript input
{
  const n = elements.length;
  for (let i = 0; i < n; i++) {
    const element = elements[i];
    console.log(element);
  }
}

{
  const n = elements.length;
  for (let i = 0; i < n; i++) {
    const element = elements[i];
    console.log(element);
  }
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
{
  for (const element of elements) {
    console.log(element);
  }
}

{
  for (const element of elements) {
    console.log(element);
  }
}
```
