
## Input
```javascript input
const a = x && y;
!a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
!(x && y);
```
