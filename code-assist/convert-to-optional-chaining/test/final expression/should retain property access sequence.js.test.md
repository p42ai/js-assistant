
## Input
```javascript input
x && x.a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.a.b;
```
