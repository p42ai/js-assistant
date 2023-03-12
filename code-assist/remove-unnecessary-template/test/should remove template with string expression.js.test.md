
## Input
```javascript input
const s = "abc";
let a = `${s}`;
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
    "suggestion": {
      "description": "You can replace an unnecessary template literal with its inner expression."
    }
  }
}
```

## Expected Output
```javascript expected output
const s = "abc";
let a = s;
```
