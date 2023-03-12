
## Input
```javascript input
switch (aVariable) {
  case "1": {
    doSomething1();
    break;
  }
  default: {
    doSomethingElse();
    break;
  }
}
```

## Configuration
```json configuration
{
  "extension": "js"
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
