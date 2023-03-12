
## Input
```javascript input
const {
  propertyA,
  propertyB
} = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "10-10",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "5-34-ObjectBindingPattern": {
    "actionZones": [
      {
        "range": "10-19",
        "label": "Move object property down",
        "level": "regular",
        "kind": "refactor.move.down.destructured-object-property.p42"
      }
    ],
    "safety": {
      "level": "UNKNOWN"
    },
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["23-23"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["23-32"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const {
  propertyB,
  propertyA
} = anObject;
```
