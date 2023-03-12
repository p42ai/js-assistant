
## Input
```javascript input
function aFunction() {
}

doSomething1();
doSomething2();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-0"
}
```

## Expected Output
```javascript expected output
doSomething1();

function aFunction() {
}
doSomething2();
```
