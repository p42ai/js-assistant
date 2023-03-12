
## Input
```javascript input
class C {
  #c: number = 42;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
class C {
  private c: number = 42;
}
```
