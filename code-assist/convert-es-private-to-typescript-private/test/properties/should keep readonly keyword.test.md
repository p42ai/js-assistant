
## Input
```javascript input
class C {
  readonly #c: number = 42;
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
  private readonly c: number = 42;
}
```
