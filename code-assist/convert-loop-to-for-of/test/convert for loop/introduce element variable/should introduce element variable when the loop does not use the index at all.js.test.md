
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  console.log("nothing");
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
  console.log("nothing");
}
```
