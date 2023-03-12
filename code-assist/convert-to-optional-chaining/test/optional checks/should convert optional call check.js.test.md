
## Input
```javascript input
x?.() && x().b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.()?.b;
```
