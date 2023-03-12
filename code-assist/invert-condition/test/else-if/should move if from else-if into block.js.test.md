
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
  "selection": "0-0"
}
```

## Expected Output
```javascript expected output
if (!a) {
  if (b) {
    console.log("2");
  }
} else {
  console.log("1");
}
```
