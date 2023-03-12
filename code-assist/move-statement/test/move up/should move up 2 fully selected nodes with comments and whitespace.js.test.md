
## Input
```javascript input
{
  // a
  statement1();

  statement2();
  statement3();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-57",
  "transformationId": "up"
}
```

## Expected Output
```javascript expected output
{
  statement2();
  statement3();

  // a
  statement1();
}
```
