
## Input
```typescript input
const aValue: string[] = [];
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

```json expected matches
{
  "13-22-ArrayType": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can convert [] into Array<…>",
      "highlightRanges": ["14-22"]
    },
    "actionZones": [
      {
        "range": "14-22",
        "label": "Convert [] to Array<…>",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const aValue: Array<string> = [];
```
