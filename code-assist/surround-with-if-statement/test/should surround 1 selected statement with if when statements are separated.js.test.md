
## Input
```javascript input
console.log("1");

// comment
console.log("2");

console.log("3");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "30-47"
}
```

## Expected Output
```javascript expected output
console.log("1");

if (true) {
  // comment
  console.log("2");
}

console.log("3");
```
