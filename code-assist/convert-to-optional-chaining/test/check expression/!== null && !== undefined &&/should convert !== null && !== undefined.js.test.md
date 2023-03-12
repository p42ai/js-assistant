
## Input
```javascript input
x !== null && x !== undefined && x.a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.a;
```
