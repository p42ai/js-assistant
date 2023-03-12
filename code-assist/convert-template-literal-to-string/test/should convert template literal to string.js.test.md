
## Input
```javascript input
x(`template`);
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
  "2-12-NoSubstitutionTemplateLiteral": {
     "safety": {
      "level": "SAFE"
    },
    "suggestion": null,
    "actionZones": [
      {
        "range": "2-12",
        "label": "Convert to string",
        "level": "preferredQuickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
x("template");
```
