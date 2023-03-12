
## Input
```javascript input
let a = `${"abc"}`;
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
  "7-18-TemplateExpression": {
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
let a = "abc";
```
