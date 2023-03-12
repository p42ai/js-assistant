
TODO this is an example where a warning might be good (results in standalone identifiers)

## Input
```javascript input
function f() {
  expression();
  {
    expression();
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "39-51"
}
```

## Expected Output
```javascript expected output
function f() {
  const newVariable = expression();
  newVariable;
  {
    newVariable;
  }
}
```
