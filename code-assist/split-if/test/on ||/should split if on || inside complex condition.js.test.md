
## Input
```javascript input
if (a > b || c !== d) {
    console.log("1");
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
if (a > b) {
    console.log("1");
} else if (c !== d) {
    console.log("1");
}
```
