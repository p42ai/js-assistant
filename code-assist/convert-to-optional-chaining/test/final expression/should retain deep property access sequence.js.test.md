
## Input
```javascript input
x && x.a.b.c;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.a.b.c;
```
