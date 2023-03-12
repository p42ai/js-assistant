
## Input
```javascript input
let a = 123;
a = a + 4;
a = 4 + a;
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
  "12-22-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can push the + operator into the assignment with +=.",
      "highlightRanges": ["13-20"]
    },
    "actionZones": [
      {
        "range": "15-16",
        "label": "Push + into assignment",
        "level": "suggestion"
      },
      {
        "range": "13-20",
        "label": "Push + into assignment",
        "level": "quickFix"
      }
    ]
  },
  "23-33-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can push the + operator into the assignment with +=.",
      "highlightRanges": ["24-27", "30-33"]
    },
    "actionZones": [
      {
        "range": "26-27",
        "label": "Push + into assignment",
        "level": "suggestion"
      },
      {
        "range": "24-31",
        "label": "Push + into assignment",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = 123;
a += 4;
a += 4;
```
