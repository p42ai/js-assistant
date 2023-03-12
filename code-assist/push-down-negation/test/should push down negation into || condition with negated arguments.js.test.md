
## Input
```javascript input
!(!a || !b);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
!!a && !!b;
```
