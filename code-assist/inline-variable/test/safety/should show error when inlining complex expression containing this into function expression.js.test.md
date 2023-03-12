
## Input
```javascript input
const run = this.run;
const f = function() {
  log(run); // `this` depends on how f is invoked
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
  "5-20-VariableDeclaration": {
    "safety": {
      "level": "ERROR",
      "message": "inlining 'this' into function changes its value"
    }
  }
}
```

## Expected Output
```javascript expected output
const f = function() {
  log(this.run); // `this` depends on how f is invoked
}
```
