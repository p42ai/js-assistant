
## Input
```javascript input
if (a) {
  console.log("1");
} else if (b) {
  console.log("2");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "40-40"
}
```

## Expected Output
```javascript expected output
if (a) {
  console.log("1");
} else if (!b) {
} else {
  console.log("2");
}
```
