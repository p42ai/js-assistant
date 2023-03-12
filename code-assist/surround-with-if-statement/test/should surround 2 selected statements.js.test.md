
## Input
```javascript input
doSomething1("c");
doSomething2("d");
doSomething3("e");
const aVariable = "value";
doSomething4("a");
doSomething5("b");
doSomething6(aVariable)
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "19-56"
}
```

## Expected Output
```javascript expected output
doSomething1("c");
if (true) {
  doSomething2("d");
  doSomething3("e");
}
const aVariable = "value";
doSomething4("a");
doSomething5("b");
doSomething6(aVariable)
```
