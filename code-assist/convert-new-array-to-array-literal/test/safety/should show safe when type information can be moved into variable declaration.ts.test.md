
## Input
```javascript input
const anArray = new Array<T>();
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
  "15-30-NewExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const anArray: T[] = [];
```
