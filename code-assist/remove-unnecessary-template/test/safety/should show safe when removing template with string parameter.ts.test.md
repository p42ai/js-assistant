
## Input
```javascript input
function f(x: string) {
  let a = `${x}`;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "33-40-TemplateExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function f(x: string) {
  let a = x;
}
```
