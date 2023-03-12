
Note: this can actually change behavior if functions with side-effects are called (because of short-circuiting).

## Input
```javascript input
a.f(1, 2, x) || a.f(1, 2, x);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "0-28-BinaryExpression": {
    "safety": {
      "level": "WARNING",
      "message": "can affect number of function or getter calls"
    }
  }
}
```

## Expected Output
```javascript expected output
a.f(1, 2, x);
```
