
## Input
```javascript input
{
  // comment
  first();

  second();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "17-17"
}
```

## Expected Output
```javascript expected output
{
  second();

  // comment
  first();
}
```
