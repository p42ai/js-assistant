
## Input
```javascript input
A.m.apply(A, [1, , 2]);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
A.m(1, undefined, 2);
```
