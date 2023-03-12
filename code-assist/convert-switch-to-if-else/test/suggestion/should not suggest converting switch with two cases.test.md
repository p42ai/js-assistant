
## Input
```javascript input
switch (aVariable) {
  case "1":
    doSomething1();
    break;
  case "2":
    doSomething2();
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
  "0-108-SwitchStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
if (aVariable === "1") {
  doSomething1();
} else if (aVariable === "2") {
  doSomething2();
}
```
