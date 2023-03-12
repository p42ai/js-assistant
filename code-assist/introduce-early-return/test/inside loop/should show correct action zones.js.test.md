
## Input
```javascript input
for (let i = 0; i < anArray.length; i++) {
  if (a) {
    doSomething();
  }
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
  "42-76-IfStatement": {
    "actionZones": [
      {
        "range": "45-51",
        "label": "Introduce early continue",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
for (let i = 0; i < anArray.length; i++) {
  if (!a) {
    continue;
  }
  doSomething();
}
```
