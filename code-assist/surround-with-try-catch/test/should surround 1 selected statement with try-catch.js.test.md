
## Input
```javascript input
console.log("1");
console.log("2");
console.log("3");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "18-35"
}
```


## Expected Matches
```json expected matches
{
  "0-53-SourceFile": {
    "suggestion": null,
    "actionZones": [
      {
        "range": "0-53",
        "level": "quickFix"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["64-64"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
console.log("1");
try {
  console.log("2");
} catch (error) {
  
}
console.log("3");
```
