
## Input
```javascript input
obj != null ? obj.a : undefined;
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
