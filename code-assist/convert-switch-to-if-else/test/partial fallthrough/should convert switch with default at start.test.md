
## Input
```javascript input
switch (aVariable) {
  default:
    doSomething1();
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

## Expected Output
```javascript expected output
if (aVariable === "2") {
  doSomething2();
} else {
  doSomething1();
  doSomething2();
}
```
