
## Input
```javascript input
x && x(1, 2);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.(1, 2);
```
