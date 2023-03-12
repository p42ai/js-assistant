
## Input
```javascript input
x?.[0] && x[0].b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.[0]?.b;
```
