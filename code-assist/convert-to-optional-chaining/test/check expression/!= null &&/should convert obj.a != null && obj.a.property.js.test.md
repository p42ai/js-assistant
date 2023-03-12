
## Input
```javascript input
obj.a != null && obj.a.property;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
obj.a?.property;
```
