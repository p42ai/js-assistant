
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

## Expected Output
```javascript expected output
class C {
    anArray: T[] = [];
}
```
