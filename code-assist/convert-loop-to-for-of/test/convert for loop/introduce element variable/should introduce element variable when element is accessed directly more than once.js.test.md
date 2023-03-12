
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  console.log(elements[i]);
  console.log(elements[i]);
  console.log(elements[i]);
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
  "0-129-ForStatement": {
    "suggestion": {
      "description": "You can convert the for loop into a 'for…of' loop.",
      "highlightRanges": ["0-41", "58-69", "86-97", "114-125"]
    },
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["5-30", "48-55", "72-79", "96-103"]
      },
      {
        "type": "RENAME",
        "position": 11
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  console.log(element);
  console.log(element);
  console.log(element);
}
```
