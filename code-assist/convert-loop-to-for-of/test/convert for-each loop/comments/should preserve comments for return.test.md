
## Input
```javascript input
elements.forEach((element) => {
  if (true) {
    // leading comment
    return;
    // trailing comment
  }
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
  if (true) {
    // leading comment
    continue;
    // trailing comment
  }
}
```
