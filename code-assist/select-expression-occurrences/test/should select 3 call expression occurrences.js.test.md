
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
  "selection": "12-16"
}
```

## Expected Matches
```json expected matches
{
  "12-16-CallExpression": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["12-16", "31-35", "50-54"]
      }
    ]
  }
}
```
