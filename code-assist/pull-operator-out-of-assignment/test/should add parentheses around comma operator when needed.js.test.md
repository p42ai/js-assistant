
## Input
```javascript input
a *= (1, 2);
a *= 1, 2; // 2 expressions: `a *= 1`, `2`
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a = a * (1, 2);
a = a * 1, 2; // 2 expressions: `a *= 1`, `2`
```
