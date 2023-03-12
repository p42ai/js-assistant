
## Input
```javascript input
x?.a?.b && x.a.b.c;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.a?.b?.c;
```
