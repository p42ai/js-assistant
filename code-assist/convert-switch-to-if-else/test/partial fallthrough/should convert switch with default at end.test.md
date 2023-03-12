
## Input
```javascript input
switch (aVariable) {
  case "2":
    doSomething2();
  default:
    doSomething1();
    break;
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
if (aVariable === "2") {
  doSomething2();
  doSomething1();
} else {
  doSomething1();
}
```
