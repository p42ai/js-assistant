
## Input
```javascript input
{

  first();



  // comment
  second();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "32-32"
}
```

## Expected Output
```javascript expected output
{

  // comment
  second();



  first();
}
```
