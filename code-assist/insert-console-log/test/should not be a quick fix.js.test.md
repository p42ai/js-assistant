
## Input
```javascript input
const a = "123";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"  
}
```

## Expected Matches
```json expected matches
{
  "5-7-Identifier": {
    "suggestion": null,
    "actionZones": [
      {
        "range": "6-7",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const a = "123";
console.log(a);
```
