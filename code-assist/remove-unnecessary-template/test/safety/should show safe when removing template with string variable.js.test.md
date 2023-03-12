
## Input
```javascript input
const x = "123";
let a = `${x}`;
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
  "24-31-TemplateExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const x = "123";
let a = x;
```
