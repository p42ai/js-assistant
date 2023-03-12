
## Input
```javascript input
const aValue = "some value";
doSomething("some value");
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
  "41-53-StringLiteral": {
    "actionZones": [
      {
        "range": "41-53",
        "label": "Replace with 'aValue'",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const aValue = "some value";
doSomething(aValue);
```
