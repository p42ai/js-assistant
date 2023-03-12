
## Input
```javascript input
Math.pow(x.f(1, 2, 3), y.g("a", q())) ** 2;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
(x.f(1, 2, 3) ** y.g("a", q())) ** 2;
```
