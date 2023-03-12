
## Input
```javascript input
const x = value;
if (x) {
  // comment
}
f();
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
  "16-40-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const x = value;
f();
```
