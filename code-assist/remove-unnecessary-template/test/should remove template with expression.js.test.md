
## Input
```javascript input
let a = `${obj.prop}`;
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
  "7-21-TemplateExpression": {
    "safety": {
      "level": "WARNING",
      "message": "might remove conversion to string"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
let a = obj.prop;
```
