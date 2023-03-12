
## Input
```javascript input
elements.forEach(function(element) {

  function nested() {
    return "123";
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

  function nested() {
    return "123";
  }

  console.log(element);
}
```