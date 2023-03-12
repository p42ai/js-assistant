
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  console.log(element);
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
  "0-100-ForStatement": {
    "suggestion": {
      "description": "You can convert the for loop into a 'for…of' loop.",
      "highlightRanges": ["0-41", "52-73"]
    },
    "actionZones": [
      {
        "range": "0-41",
        "label": "Convert to for…of loop",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  console.log(element);
}
```
