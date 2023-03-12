
## Input
```javascript input
a = (x != null ? x : 123)!;
b = x != null ? x : 234;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
a = (x ?? 123)!;
b = x ?? 234;
```
