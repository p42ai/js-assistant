
## Input
```javascript input
console.log(f(a));
console.log(f(a));
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "12-16"
}
```

## Expected Matches
```json expected matches
{
  "12-16-CallExpression": {
    "actionZones": [
      {
        "range": "12-16",
        "label": "Select 2 occurrences",
        "kind": "refactor.select.expression-occurrences.p42",
        "level": "quickFix"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["12-16", "31-35"]
      }
    ]
  }
}
```
