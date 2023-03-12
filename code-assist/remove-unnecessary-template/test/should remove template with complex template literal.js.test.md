
## Input
```javascript input
let a = `${`a${b}c${d}e`}`;
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
  "7-26-TemplateExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can replace an unnecessary template literal with its inner expression."
    }
  }
}
```

## Expected Output
```javascript expected output
let a = `a${b}c${d}e`;
```
