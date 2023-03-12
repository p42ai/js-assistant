
## Input
```javascript input
const myVariable = "123";
x.myVariable(); // unrelated call
console.log(myVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "72-82"
}
```

## Expected Output
```javascript expected output
const myVariable = "123";
x.myVariable(); // unrelated call
const myVariable2 = myVariable;
console.log(myVariable2);
```
