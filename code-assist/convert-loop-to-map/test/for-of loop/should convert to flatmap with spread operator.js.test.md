
## Input
```javascript input
const result = [];
for (const value of values) {
  result.push(...value);
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
  "18-75-ForOfStatement": {
    "actionZones": [
      {
        "label": "Convert to .flatMap()"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const result = values.flatMap((value) => {
  return value;
});
```
