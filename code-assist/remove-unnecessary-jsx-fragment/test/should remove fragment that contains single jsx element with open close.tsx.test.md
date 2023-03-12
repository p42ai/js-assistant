
## Input
```javascript input
const a = (
  <>
    <element attr1="value" attr2="v2">
      sometext
    </element>
  </>
);
```

## Configuration
```json configuration
{
  "extension": "tsx"
}
```

## Expected Matches
```json expected matches
{
  "11-91-JsxFragment": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove an unnecessary JSX fragment.",
      "highlightRanges": ["14-16", "88-91"]
    },
    "actionZones": [
      {
        "range": "14-16",
        "label": "Remove fragment",
        "level": "suggestion"
      },
      {
        "range": "88-91",
        "label": "Remove fragment",
        "level": "suggestion"
      }
    ]
    
  }
}
```

## Expected Output
```javascript expected output
const a = (
  <element attr1="value" attr2="v2">
    sometext
  </element>
);
```
