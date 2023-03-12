
## Input
```javascript input
const self = this;
function f() {
  log(self); // `this` depends on how f is invoked
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "5-17-VariableDeclaration": {
    "safety": {
      "level": "ERROR",
      "message": "inlining 'this' into function changes its value"
    }
  }
}
```

## Expected Output
```javascript expected output
function f() {
  log(this); // `this` depends on how f is invoked
}
```
