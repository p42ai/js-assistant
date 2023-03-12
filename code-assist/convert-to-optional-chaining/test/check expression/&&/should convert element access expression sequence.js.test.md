
## Input
```javascript input
x['v1']['v2'] && x['v1']['v2'].a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x['v1']['v2']?.a;
```
