
## Input
```javascript input
elements.forEach((element) => {
  console.log(element);
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "0-59-ExpressionStatement": {
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["5-30"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  console.log(element);
}
```
