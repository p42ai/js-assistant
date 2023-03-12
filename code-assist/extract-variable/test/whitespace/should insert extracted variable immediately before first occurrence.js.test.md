
## Input
```javascript input
const myVar = 123;

// a comment

let x = "1234";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "42-48"
}
```

## Expected Output
```javascript expected output
const myVar = 123;

// a comment

const newVariable = "1234";
let x = newVariable;
```
