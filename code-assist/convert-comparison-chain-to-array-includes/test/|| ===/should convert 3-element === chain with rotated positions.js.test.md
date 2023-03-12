
## Input
```javascript input
value === "a" || "b" === value || "c" === value;
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
