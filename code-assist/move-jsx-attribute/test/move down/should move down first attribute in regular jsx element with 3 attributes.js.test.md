
## Input
```javascript input
<Element
  attribute1={1}
  attribute2={2}
  attribute3={3}
>text</Element>
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "11-11"
}
```

## Expected Matches
```json expected matches
{
  "8-59-JsxAttributes": {
    "actionZones": [
      {
        "range": "11-25",
        "label": "Move attribute down",
        "level": "regular",
        "kind": "refactor.move.down.jsx-attribute.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
<Element
  attribute2={2}
  attribute1={1}
  attribute3={3}
>text</Element>
```
