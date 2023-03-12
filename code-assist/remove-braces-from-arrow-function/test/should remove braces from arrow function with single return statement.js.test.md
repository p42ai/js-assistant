
## Input
```javascript input
let a = () => {
  return "abc";
};
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
  "7-33-ArrowFunction": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the braces {…} from the arrow function.",
      "highlightRanges": ["14-15", "32-33"]
    },
    "actionZones": [
      {
        "range": "14-15",
        "label": "Remove {…} from arrow function",
        "level": "suggestion"
      },
      {
        "range": "8-24",
        "label": "Remove {…} from arrow function",
        "level": "quickFix"
      },
      {
        "range": "8-33",
        "label": "Remove {…} from arrow function",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let a = () => "abc";
```
