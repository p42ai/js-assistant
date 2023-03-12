
## Input
```javascript input
value !== "a" && !(value === "b");
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-33"
}
```

## Expected Output
```javascript expected output
!["a", "b"].includes(value);
```
