
## Input
```javascript input
x && x.a == null;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.a == null;
```
