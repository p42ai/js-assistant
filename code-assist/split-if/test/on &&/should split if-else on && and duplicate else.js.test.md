
## Input
```javascript input
if (a && b) {
    console.log("1");
} else {
    console.log("2");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6",
  "transformationId": "split-and-into-nested-if-with-duplicate-else"
}
```

## Expected Matches
```json expected matches
{
  "4-10-BinaryExpression": {
    "availableTransformations": [
      "split-and-into-nested-if-with-duplicate-else"
    ],
    "safety": {
      "level": "SAFE"
    },
    "actionZones": [
      {
        "range": "6-8",
        "label": "Split into nested if and duplicate else",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (a) {
    if (b) {
        console.log("1");
    } else {
        console.log("2");
    }
} else {
    console.log("2");
}
```
