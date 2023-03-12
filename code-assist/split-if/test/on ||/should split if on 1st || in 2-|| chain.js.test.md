
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
  "selection": "6-6"
}
```

## Expected Output
```javascript expected output
if (a) {
    console.log("1");
} else if (b || c) {
    console.log("1");
}
```
