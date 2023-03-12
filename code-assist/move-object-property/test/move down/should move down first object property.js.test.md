
## Input
```javascript input
const anObject = {
  property1: "value1",
  property2: "value2"
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "21-21",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "16-65-ObjectLiteralExpression": {
    "actionZones": [
      {
        "range": "21-40",
        "label": "Move property down",
        "level": "regular",
        "kind": "refactor.move.down.object-property.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["44-44"]
      }
    ],
    "safety": {
      "level": "WARNING",
      "message": "changes properties order"
    }
  }
}
```

## Expected Output
```javascript expected output
const anObject = {
  property2: "value2",
  property1: "value1"
};
```
