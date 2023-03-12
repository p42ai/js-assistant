
## Input
```javascript input
x ? !(b && c) : z;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x ? !b || !c : z;
```
