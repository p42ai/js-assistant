
## Input
```javascript input
elements.forEach(function(element) {
  if (element !== "abc") {
    return;
  }

  console.log(element);
});
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
  if (element !== "abc") {
    continue;
  }

  console.log(element);
}
```