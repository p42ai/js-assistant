
## Input
```javascript input
a = x.f(1) == null ? 123 : x.f(1);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a = x.f(1) ?? 123;
```
