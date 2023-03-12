
## Input
```javascript input
!!(a ? b : c) as AType;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
(a ? b : c) as AType;
```
