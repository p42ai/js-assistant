
## Input
```javascript input
f() != null && f().a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f()?.a;
```
