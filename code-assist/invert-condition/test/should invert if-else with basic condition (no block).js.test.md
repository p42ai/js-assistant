
## Input
```javascript input
if (a) f(1); else f(2);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (!a) f(2); else f(1);
```
