
## Input
```javascript input
switch (aVariable) {
  case "1":
  case "2":
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
if (aVariable === "1" || aVariable === "2") {
  doSomething();
}
```
