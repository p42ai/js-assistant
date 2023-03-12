
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
  "selection": "45-45"
}
```

## Expected Matches
```json expected matches
{
  "8-59-JsxAttributes": {
    "actionZones": [
      {
        "range": "45-59",
        "label": "Move attribute up",
        "level": "regular",
        "kind": "refactor.move.up.jsx-attribute.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
<Element
  attribute1={1}
  attribute3={3}
  attribute2={2}
>text</Element>
```
