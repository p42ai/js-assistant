
## Input
```javascript input
doSomething(function(localVariable) {
  log(localVariable);
});
doSomething(function(localVariable) {
  log(localVariable);
});
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "12-61"
}
```

## Expected Output
```javascript expected output
const newVariable = function(localVariable) {
  log(localVariable);
};
doSomething(newVariable);
doSomething(newVariable);
```
