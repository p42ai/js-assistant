
## Input
```javascript input
const anArray: S[] = new Array<T>();
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
  "20-35-NewExpression": {
    "safety": {
      "level": "INFORMATION",
      "message": "removes generic type"
    }
  }
}
```

## Expected Output
```javascript expected output
const anArray: S[] = [];
```
