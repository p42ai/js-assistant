
## Input
```javascript input
if (a || b || c) {
    console.log("1");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "11-11"
}
```

## Expected Output
```javascript expected output
if (a || b) {
    console.log("1");
} else if (c) {
    console.log("1");
}
```
