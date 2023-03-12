
## Input
```javascript input
class C {
    anArray: S[] = new Array<T>();
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
  "28-43-NewExpression": {
    "safety": {
      "level": "INFORMATION",
      "message": "removes generic type"
    }
  }
}
```

## Expected Output
```javascript expected output
class C {
    anArray: S[] = [];
}
```
