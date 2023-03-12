
## Input
```javascript input
switch (aVariable) {
  case "1":
    doSomething1();
  default:
    doSomething2();
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
  "0-85-SwitchStatement": {
    "suggestion": {
      "description": "You can convert the switch statement into an if-else-statement."
    }
  }
}
```

## Expected Output
```javascript expected output
if (aVariable === "1") {
  doSomething1();
  doSomething2();
} else {
  doSomething2();
}
```
