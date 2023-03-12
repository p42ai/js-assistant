
## Input
```javascript input
let a = () => {
  return false;
};
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
  "7-33-ArrowFunction": {
    "actionZones": [
      {
        "range": "14-15",
        "level": "suggestion"
      },
      {
        "range": "8-24",
        "level": "quickFix"
      },
      {
        "range": "8-33",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = () => false;
```
