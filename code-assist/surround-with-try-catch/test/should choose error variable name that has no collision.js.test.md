
## Input
```javascript input
const error = "test";
console.log("2");
console.log("3");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "22-39"
}
```

## Expected Output
```javascript expected output
const error = "test";
try {
  console.log("2");
} catch (error2) {
  
}
console.log("3");
```
