
## Input
```javascript input
const newVariable = "123";
console.log(f(a));
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "39-43"
}
```

## Expected Output
```javascript expected output
const newVariable = "123";
const newVariable2 = f(a);
console.log(newVariable2);
```
