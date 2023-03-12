
## Input
```javascript input
// comment
console.log("1");
console.log("2");
console.log("3");
console.log("4");
```

## Configuration
```json configuration
{
  "selection": "0-65"
}
```

## Expected Output
```javascript expected output
try {
  // comment
  console.log("1");
  console.log("2");
  console.log("3");
} catch (error) {
  
}
console.log("4");
```
