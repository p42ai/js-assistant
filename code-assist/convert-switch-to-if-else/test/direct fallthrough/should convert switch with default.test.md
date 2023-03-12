
## Input
```javascript input
switch (aVariable) {
  default:
  case "1":
    doSomething();
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
if (aVariable === "1") {
  doSomething();
} else {
  doSomething();
}
```
