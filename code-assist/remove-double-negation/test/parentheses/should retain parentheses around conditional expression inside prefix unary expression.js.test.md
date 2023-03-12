
## Input
```javascript input
~!!(a ? b : c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
~(a ? b : c);
```
