
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
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const t = `start-value-end`;
```
