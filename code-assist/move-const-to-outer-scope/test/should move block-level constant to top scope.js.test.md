
## Input
```javascript input
const somethingElse = a + b;
{
  const aConstant = "value";
  aConstant + aParameter;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const somethingElse = a + b;
const aConstant = "value";
{
  aConstant + aParameter;
}
```
