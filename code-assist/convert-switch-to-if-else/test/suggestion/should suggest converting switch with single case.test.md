
## Input
```javascript input
switch (aVariable) {
  case "1":
    doSomething1();
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
  "0-54-SwitchStatement": {
    "suggestion": {
      "description": "You can convert the switch statement into an if-statement."
    }
  }
}
```

## Expected Output
```javascript expected output
if (aVariable === "1") {
  doSomething1();
}
```
