
## Input
```javascript input
<Element attribute1={1} attribute2={2} />
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "26-28",
  "transformationId": "up"
}
```

## Expected Matches
```json expected matches
{
  "8-38-JsxAttributes": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["11-13"]
      }
    ]
  }
}
```


## Expected Output
```javascript expected output
<Element attribute2={2} attribute1={1} />
```
