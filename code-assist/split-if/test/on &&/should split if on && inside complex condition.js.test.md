
## Input
```javascript input
if (a > b && c !== d) {
    console.log("1");
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
  "4-20-BinaryExpression": {
    "availableTransformations": ["split-and-into-nested-if"],
    "safety": {
      "level": "SAFE"
    },
    "actionZones": [
      {
        "range": "10-12",
        "label": "Split into nested if",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (a > b) {
    if (c !== d) {
        console.log("1");
    }
}
```
