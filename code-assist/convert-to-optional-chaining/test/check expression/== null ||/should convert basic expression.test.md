
## Input
```javascript input
a == null || a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a?.b;
```
