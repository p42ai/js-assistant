
## Input
```javascript input
x && x['v1'];
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.['v1'];
```
