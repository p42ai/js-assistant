
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
  "selection": "4-7",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-26-Block": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["16-19"]
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
