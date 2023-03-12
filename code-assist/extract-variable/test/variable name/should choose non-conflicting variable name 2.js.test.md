
## Input
```javascript input
console.log(f(a));
{
  const newVariable = "123";
  console.log(f(a));
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "12-16"
}
```

## Expected Output
```javascript expected output
const newVariable2 = f(a);
console.log(newVariable2);
{
  const newVariable = "123";
  console.log(newVariable2);
}
```
