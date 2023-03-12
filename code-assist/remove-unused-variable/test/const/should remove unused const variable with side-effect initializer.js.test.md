
## Input
```javascript input
const a = g();
f("hello");
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
  "5-13-VariableDeclaration": {
    "actionZones": [
      {
        "range": "6-7",
        "label": "Remove unused variable",
        "level": "suggestion"
      }
    ],
    "suggestion": {
      "description": "You can remove the unused variable 'a'."
    },
    "safety": {
      "level": "WARNING",
      "message": "removes initializer with potential side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
f("hello");
```
