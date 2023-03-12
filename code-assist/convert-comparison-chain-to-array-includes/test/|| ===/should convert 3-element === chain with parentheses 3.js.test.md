
## Input
```javascript input
value === "a" || ((value === "b") || (value === "c"));
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
["a", "b", "c"].includes(value);
```
