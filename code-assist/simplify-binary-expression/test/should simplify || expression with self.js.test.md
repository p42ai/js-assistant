
Note: this can actually change behavior if functions with side-effects are called (because of short-circuiting).

## Input
```javascript input
x || x;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x;
```
