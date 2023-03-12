
## Input
```javascript input
function f(x) {
  let a = `${x}`;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "25-32-TemplateExpression": {
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "might remove conversion to string"
    }
  }
}
```

## Expected Output
```javascript expected output
function f(x) {
  let a = x;
}
```
