
## Input
```javascript input
!!(b && c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
!(!b || !c);
```
