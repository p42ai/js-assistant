
Individual elements are transformed, but not the whole chain:

## Input
```javascript input
value !== "a" || value !== "b";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
!["a"].includes(value) || !["b"].includes(value);
```
