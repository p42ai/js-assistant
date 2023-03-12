
## Input
```javascript input
{
  if (a) {
    if (b) {
      f();
    }
  }
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
{
  if (a && b) {
    f();
  }
};
```
