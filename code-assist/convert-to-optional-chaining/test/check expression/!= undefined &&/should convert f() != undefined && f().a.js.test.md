
## Input
```javascript input
f() != undefined && f().a;
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
