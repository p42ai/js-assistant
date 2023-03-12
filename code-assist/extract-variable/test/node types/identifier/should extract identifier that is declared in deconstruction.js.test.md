
## Input
```javascript input
const { myVariable } = x;
console.log(myVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "38-48"
}
```

## Expected Output
```javascript expected output
const { myVariable } = x;
const myVariable2 = myVariable;
console.log(myVariable2);
```
