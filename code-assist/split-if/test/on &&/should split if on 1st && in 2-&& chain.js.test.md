
## Input
```javascript input
if (a && b && c) {
    console.log("1");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"
}
```

## Expected Matches
```json expected matches
{
  "4-10-BinaryExpression": {
    "availableTransformations": ["split-and-into-nested-if"],
    "safety": {
      "level": "SAFE"
    },
    "actionZones": [
      {
        "range": "6-8",
        "label": "Split into nested if",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (a) {
    if (b && c) {
        console.log("1");
    }
}
```
