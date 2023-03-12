
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
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["22-26"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
console.log("1");
if (true) {
  console.log("2");
}
console.log("3");
```
