
## Input
```javascript input
if (a || b) {
    console.log("1");
} else {
    console.log("2");
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
if (a) {
    console.log("1");
} else if (b) {
    console.log("1");
} else {
    console.log("2");
}
```
