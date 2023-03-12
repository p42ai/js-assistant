
## Input
```javascript input
elements.forEach(function(element) {
  console.log(element);
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "0-64-ExpressionStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  console.log(element);
}
```
