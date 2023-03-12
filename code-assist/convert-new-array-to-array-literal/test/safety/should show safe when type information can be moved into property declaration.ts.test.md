
## Input
```javascript input
class C {
    anArray = new Array<T>();
}
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
  "23-38-NewExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
class C {
    anArray: T[] = [];
}
```
