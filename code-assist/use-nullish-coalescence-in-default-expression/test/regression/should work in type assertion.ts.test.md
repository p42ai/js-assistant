
## Input
```javascript input
a = <number>(x != null ? x : 123);
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
a = <number>(x ?? 123);
b = x ?? 234;
```
