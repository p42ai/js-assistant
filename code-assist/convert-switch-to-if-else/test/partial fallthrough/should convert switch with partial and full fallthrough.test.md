
## Input
```javascript input
switch (aVariable) {
  case "0":
  case "1":
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
if (aVariable === "0" || aVariable === "1") {
  doSomething1();
  doSomething2();
} else if (aVariable === "2") {
  doSomething2();
}
```
