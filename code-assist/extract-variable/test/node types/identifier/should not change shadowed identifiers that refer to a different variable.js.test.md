
## Input
```javascript input
const myVariable = "123";
{
  const myVariable = 999; // shadowing
  console.log(myVariable);
}
console.log(myVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "108-118"
}
```

## Expected Output
```javascript expected output
const myVariable = "123";
{
  const myVariable = 999; // shadowing
  console.log(myVariable);
}
const myVariable2 = myVariable;
console.log(myVariable2);
```
