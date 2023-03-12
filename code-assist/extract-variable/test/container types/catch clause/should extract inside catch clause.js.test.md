
## Input
```javascript input
try {
  something();
} catch (error) {
  const x = somethingElse(error);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "51-71"
}
```

## Expected Output
```javascript expected output
try {
  something();
} catch (error) {
  const newVariable = somethingElse(error);
  const x = newVariable;
}
```
