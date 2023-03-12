
## Input
```javascript input
switch (aVariable) {
  case "0":
  case "1":
    doSomething1a();
    doSomething1b();
    {
      doSomething1c();
    }
  case "2":
    doSomething2a();
    doSomething2b();
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
  doSomething1a();
  doSomething1b();
  {
    doSomething1c();
  }
  doSomething2a();
  doSomething2b();
} else if (aVariable === "2") {
  doSomething2a();
  doSomething2b();
}
```
