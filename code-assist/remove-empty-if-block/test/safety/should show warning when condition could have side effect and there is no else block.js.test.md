
## Input
```javascript input
if (condition()) {
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
  "0-20-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "condition could have side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
f();
```
