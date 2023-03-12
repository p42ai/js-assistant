
## Input
```javascript input
switch (aVariable) {
  case "0":
    doSomething0();
    break;
  case "1":
  case "2":
  case "3":
    doSomething123();
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
if (aVariable === "0") {
  doSomething0();
} else if (aVariable === "1" || aVariable === "2" || aVariable === "3") {
  doSomething123();
}
```
