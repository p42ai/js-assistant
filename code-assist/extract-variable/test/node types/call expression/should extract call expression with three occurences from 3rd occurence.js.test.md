
## Input
```javascript input
console.log(f(a));
console.log(f(a));
console.log(f(a));
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "50-54"
}
```

## Expected Output
```javascript expected output
const newVariable = f(a);
console.log(newVariable);
console.log(newVariable);
console.log(newVariable);
```
