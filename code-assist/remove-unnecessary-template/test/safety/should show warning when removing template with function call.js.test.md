
## Input
```javascript input
let a = `${f()}`;
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
  "7-16-TemplateExpression": {
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
let a = f();
```
