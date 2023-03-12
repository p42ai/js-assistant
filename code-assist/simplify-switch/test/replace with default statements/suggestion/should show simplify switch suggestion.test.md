
## Input
```javascript input
switch (condition) {
  default: {
    doSomething();
  }
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
  "0-58-SwitchStatement": {
    "suggestion": {
      "description": "You can simplify the switch statement."
    }
  }
}
```

## Expected Output
```javascript expected output
doSomething();
```
