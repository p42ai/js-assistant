
## Input
```javascript input
{
  statement1();
  
  // comment 2
  statement2();
  // comment 3
  statement3();
  // comment 4
  statement4();
  statement5();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "42-73",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-131-Block": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["73-104"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["69-82", "100-113"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
{
  statement1();
  
  // comment 4
  statement4();
  // comment 2
  statement2();
  // comment 3
  statement3();
  statement5();
}
```
