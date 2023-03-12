
## Input
```javascript input
const jsx = <Tag></Tag>;
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
  "11-23-JsxElement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can collapse the empty JSX tag into a self-closing tag.",
      "highlightRanges": ["12-23"]
    },
    "actionZones": [
      {
        "label": "Collapse tag"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const jsx = <Tag />;
```
