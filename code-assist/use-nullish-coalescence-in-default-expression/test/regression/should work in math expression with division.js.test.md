
## Input
```javascript input
a = 2 / (x != null ? x : 123);
b = x != null ? x : 234;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a = 2 / (x ?? 123);
b = x ?? 234;
```
