
## Input
```javascript input
const anObject = {
  property1: "value1",
  property2: "value2",

  // comment
  property3: "value3",
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "81-81"
}
```

## Expected Matches
```json expected matches
{
  "16-103-ObjectLiteralExpression": {
    "actionZones": [
      {
        "range": "81-100",
        "label": "Move property up",
        "level": "regular",
        "kind": "refactor.move.up.object-property.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const anObject = {
  property1: "value1",
  // comment
  property3: "value3",

  property2: "value2",
};
```
