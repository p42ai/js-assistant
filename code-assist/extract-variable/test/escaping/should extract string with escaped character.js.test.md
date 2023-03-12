
## Input
```javascript input
console.log("\"\r\n\b\f\t\v\0\\");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "12-32"
}
```

## Expected Output
```javascript expected output
const newVariable = "\"\r\n\b\f\t\v\0\\";
console.log(newVariable);
```
