
## Input
```javascript input
function f(): string {
  return "x";
}

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
  "47-56-TemplateExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function f(): string {
  return "x";
}

let a = f();
```
