
## Input
```javascript input
console.log(f(a));
console.log(f(a));
console.log(f(a));
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "50-54"
}
```

## Expected Matches
```json expected matches
{
  "50-54-CallExpression": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["50-54", "12-16", "31-35"]
      }
    ]
  }
}
```
