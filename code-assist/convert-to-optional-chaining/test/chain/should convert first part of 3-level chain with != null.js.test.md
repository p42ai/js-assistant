
## Input
```javascript input
x != null && x.a && x.a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.a && x.a.b;
```
