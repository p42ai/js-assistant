
## Input
```javascript input
{
  first();
  second();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "15-15"
}
```

## Expected Matches
```json expected matches
{
  "0-26-Block": {
    "safety": {
      "level": "WARNING",
      "message": "changes execution order"
    }
  }
}
```

## Expected Output
```javascript expected output
{
  second();
  first();
}
```
