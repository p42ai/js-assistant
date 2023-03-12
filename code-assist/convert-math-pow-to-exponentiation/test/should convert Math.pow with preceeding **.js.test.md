
## Input
```javascript input
2 ** Math.pow(x.f(1, 2, 3), y.g("a", q()));
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
2 ** x.f(1, 2, 3) ** y.g("a", q());
```
