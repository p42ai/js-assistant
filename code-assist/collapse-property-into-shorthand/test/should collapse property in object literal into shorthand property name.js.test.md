
## Input
```javascript input
const v1 = "123";
const a = {
  v1: v1
};
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
  "29-38-PropertyAssignment": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can collapse 'v1: v1' into a shorthand property name.",
      "highlightRanges": ["32-38"]
    },
    "actionZones": [
      {
        "label":  "Collapse into shorthand"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const v1 = "123";
const a = {
  v1
};
```
