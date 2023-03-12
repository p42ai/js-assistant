
## Input
```javascript input
let s = "a" + "b"; // comment 1

// unrelated commented
console.log("");
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let s = "ab"; // comment 1

// unrelated commented
console.log("");
```
