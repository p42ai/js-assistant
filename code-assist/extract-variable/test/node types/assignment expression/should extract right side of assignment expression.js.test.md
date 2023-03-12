
## Input
```javascript input
let x = "3";
x = "1234";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "17-23"
}
```

## Expected Output
```javascript expected output
let x = "3";
const newVariable = "1234";
x = newVariable;
```
