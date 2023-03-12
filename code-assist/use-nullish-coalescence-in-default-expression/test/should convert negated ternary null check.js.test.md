
## Input
```javascript input
a = x != null ? x : 123;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a = x ?? 123;
```
