
## Input
```javascript input
const t = `start-${"value"}-end`;
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
  "19-32-TemplateSpan": {
    "suggestion": {
      "description": "You can inline '\"value\"' into the outer template literal."
    }
  }
}
```

## Expected Output
```javascript expected output
const t = `start-value-end`;
```
