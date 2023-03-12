
## Input
```javascript input
if (x) {
} else {
  g();
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
  "0-26-IfStatement": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
if (!x) {
  g();
}
f();
```
