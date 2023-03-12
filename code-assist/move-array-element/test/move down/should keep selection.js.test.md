
## Input
```javascript input
["first", "second"];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "3-6",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-19-ArrayLiteralExpression": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["13-16"]
      }
    ]
  }
}
```


## Expected Output
```javascript expected output
["second", "first"];
```
