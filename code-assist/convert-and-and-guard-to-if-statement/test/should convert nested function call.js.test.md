
## Input
```javascript input
a && f();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (a) f();
```
