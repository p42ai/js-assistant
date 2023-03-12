
## Input
```javascript input
const a = value1, b = value2, c = value3;
if (a + b < 123 * c) {
    console.log("1");
} else if (!(a + b < 123 * c)) {
    console.log("2");
} else {
    console.log("3"); // can never be invoked
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
const a = value1, b = value2, c = value3;
if (a + b < 123 * c) {
    console.log("1");
} else {
    console.log("2");
}
```
