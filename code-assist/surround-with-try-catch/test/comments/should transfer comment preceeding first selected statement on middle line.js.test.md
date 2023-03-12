
## Input
```javascript input
console.log("1");
// comment
console.log("2");
console.log("3");
console.log("4");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "18-65"
}
```

## Expected Output
```javascript expected output
console.log("1");
try {
  // comment
  console.log("2");
  console.log("3");
} catch (error) {
  
}
console.log("4");
```
