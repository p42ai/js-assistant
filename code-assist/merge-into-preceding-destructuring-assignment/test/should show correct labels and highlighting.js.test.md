
## Input
```javascript input
const obj = { a: "abc", b: 123 };
const { a } = obj;
const { b } = obj;
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
  "52-71-VariableStatement": {
    "suggestion": {
      "description": "You can merge an object destructuring assignment into its preceding sibling.",
      "highlightRanges": ["40-51", "59-70"]
    },
    "actionZones": [
      {
        "range": "53-71",
        "label": "Merge into previous destructuring assignment"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "abc", b: 123 };
const { a, b } = obj;
```
