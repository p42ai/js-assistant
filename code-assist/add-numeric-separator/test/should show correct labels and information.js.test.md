
## Input
```javascript input
const literals = [
   1,
   999,
   1000, // want to have 2 leading chars
   1001, // want to have 2 leading chars
   9999, // want to have 2 leading chars
   10000,
   100000,
   1000000000000,
]
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
  "82-122-NumericLiteral": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": null,
    "actionZones": [
      {
        "label": "Add numeric separator"
      }
    ]
  },
  "123-164-NumericLiteral": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can add numeric separators to the decimal number '10000'.",
      "highlightRanges": ["159-164"]
    },
    "actionZones": [
      {
        "label": "Add numeric separator"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const literals = [
   1,
   999,
   1_000, // want to have 2 leading chars
   1_001, // want to have 2 leading chars
   9_999, // want to have 2 leading chars
   10_000,
   100_000,
   1_000_000_000_000,
]
```
