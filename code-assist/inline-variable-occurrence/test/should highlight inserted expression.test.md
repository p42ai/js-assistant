
## Input
```javascript input
const aVariable = "value";
doSomething(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "39-39"
}
```

## Expected Matches
```json expected matches
{
  "39-48-Identifier": {
    "postEditActions": [
      { "type": "HIGHLIGHT", "highlights": ["39-46"] }
    ]
  }
}
```

## Expected Output
```javascript expected output
const aVariable = "value";
doSomething("value");
```
