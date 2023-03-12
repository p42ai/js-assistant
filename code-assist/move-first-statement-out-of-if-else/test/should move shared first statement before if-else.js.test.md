
## Input
```javascript input
if (x) {
  f1();
  f2a();
} else {
  f1();
  f2b();
}
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
  "0-53-IfStatement": {
    "actionZones": [
      {
        "range": "11-16",
        "label": "Move above if-else"
      },
      {
        "range": "37-42",
        "label": "Move above if-else"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
f1();
if (x) {
  f2a();
} else {
  f2b();
}
```
