
## Input
```javascript input
for (const element of elements) {
  console.log(element);
}
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
  "0-59-ForOfStatement": {
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["0-29"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
elements.forEach((element) => {
  console.log(element);
});
```
