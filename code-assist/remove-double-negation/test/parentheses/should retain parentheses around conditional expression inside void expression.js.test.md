
## Input
```javascript input
void !!(a ? b : c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
void (a ? b : c);
```
