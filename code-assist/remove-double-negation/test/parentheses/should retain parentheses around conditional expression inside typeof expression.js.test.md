
## Input
```javascript input
typeof !!(a ? b : c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
typeof (a ? b : c);
```
