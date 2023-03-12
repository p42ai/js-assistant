
## Input
```javascript input
const values = [];
elements.forEach((element) => {
  values.push(f(element));
}
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
  "18-79-ExpressionStatement": {
    "actionZones": [
      {
        "range": "28-35",
        "label": "Convert to .map()",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const values = elements.map((element) => {
  return f(element);
});
```
