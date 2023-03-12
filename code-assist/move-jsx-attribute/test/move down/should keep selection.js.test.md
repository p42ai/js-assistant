
## Input
```javascript input
<Element attribute1={1} attribute2={2} />
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "10-12",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "8-38-JsxAttributes": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["25-27"]
      }
    ]
  }
}
```


## Expected Output
```javascript expected output
<Element attribute2={2} attribute1={1} />
```
