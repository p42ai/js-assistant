
## Input
```javascript input
obj == null ? undefined : obj.a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
obj?.a;
```
