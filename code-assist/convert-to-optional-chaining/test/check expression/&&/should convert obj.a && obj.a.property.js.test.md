
## Input
```javascript input
obj.a && obj.a.property;
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
