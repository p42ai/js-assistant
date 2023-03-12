
## Input
```javascript input
const x = value;
if (x) {
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
  "16-27-IfStatement": {
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const x = value;
f();
```
