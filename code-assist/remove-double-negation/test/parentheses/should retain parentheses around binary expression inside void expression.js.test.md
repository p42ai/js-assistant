
## Input
```javascript input
void !!(a || b);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
void (a || b);
```
