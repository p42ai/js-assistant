
## Input
```javascript input
switch (aVariable) {
  case "1":
    doSomething1();
    break;
  default: 
    doSomethingElse();
    break;
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
  "0-111-SwitchStatement": {
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
} else {
  doSomethingElse();
}
```
