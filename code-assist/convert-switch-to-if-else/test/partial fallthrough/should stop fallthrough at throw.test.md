
## Input
```javascript input
function f(aVariable) {
  switch (aVariable) {
    case "0":
    case "1":
      doSomething1();
    case "2":
      doSomething2();
      throw new Error();
    case "3":
      doSomething3();
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
  if (aVariable === "0" || aVariable === "1") {
    doSomething1();
    doSomething2();
    throw new Error();
  } else if (aVariable === "2") {
    doSomething2();
    throw new Error();
  } else if (aVariable === "3") {
    doSomething3();
  }
}
```
