
## Input
```javascript input
function f(aVariable) {
  switch (aVariable) {
    case "1":
      return doSomething1();
    default:
      return doSomethingElse();
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
function f(aVariable) {
  if (aVariable === "1") {
    return doSomething1();
  } else {
    return doSomethingElse();
  }
}
```
