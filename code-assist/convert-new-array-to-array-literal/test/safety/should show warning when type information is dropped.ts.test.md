
## Input
```javascript input
new Array<T>();
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "0-14-NewExpression": {
    "safety": {
      "level": "WARNING",
      "message": "removes generic type"
    }
  }
}
```

## Expected Output
```javascript expected output
[];
```
