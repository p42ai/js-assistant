
## Input
```javascript input
{
  first();
  second();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "15-18",
  "transformationId": "up"
}
```

## Expected Matches
```json expected matches
{
  "0-26-Block": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["4-7"]
      }
    ]
  }
}
```


## Expected Output
```javascript expected output
{
  second();
  first();
}
```
