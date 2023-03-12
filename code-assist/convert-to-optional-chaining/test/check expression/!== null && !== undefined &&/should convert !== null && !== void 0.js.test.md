
## Input
```javascript input
x !== null && x !== void 0 && x.a;
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
