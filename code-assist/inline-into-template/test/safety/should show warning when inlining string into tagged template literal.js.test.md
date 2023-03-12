
## Input
```javascript input
const t = tag`start-${"value"}-end`;
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
  "22-35-TemplateSpan": {
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "can change tagged template parameter values"
    }
  }
}
```

## Expected Output
```javascript expected output
const t = tag`start-value-end`;
```
