
## Input
```javascript input
switch (condition()) {
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
  "0-24-SwitchStatement": {
    "safety": {
      "level": "WARNING",
      "message": "condition could have side-effect"
    }
  }
}
```

## Expected Output
```javascript expected output
```
