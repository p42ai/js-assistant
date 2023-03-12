
## Input
```javascript input
obj != null && obj.property;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
obj?.property;
```
