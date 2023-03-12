
TODO better formatting of output (should start on new line)

## Input
```javascript input
switch (a) {
  case 1: {
    doSomething1();
    break;
  }
  case 2:
    doSomething2();
    break;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "15-15"
}
```

## Expected Output
```javascript expected output
switch (a) {
  case 1: doSomething1();
    break;
  case 2:
    doSomething2();
    break;
}
```
