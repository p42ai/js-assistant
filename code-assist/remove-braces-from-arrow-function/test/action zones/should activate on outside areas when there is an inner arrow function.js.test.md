
## Input
```javascript input
let a = () => {
  return () => {
    return false;
  };
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "8-8"
}
```

## Expected Matches
```json expected matches
{
  "7-57-ArrowFunction": {
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
        "range": "8-24",
        "level": "regular"
      },
      {
        "range": "54-57",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = () => () => {
  return false;
};
```
