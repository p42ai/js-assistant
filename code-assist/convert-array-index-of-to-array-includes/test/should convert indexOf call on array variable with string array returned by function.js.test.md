
## Input
```javascript input
function getStrings() {
  return ["1", "2", "3"];
}

getStrings().indexOf(c) !== -1;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "51-83-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function getStrings() {
  return ["1", "2", "3"];
}

getStrings().includes(c);
```
