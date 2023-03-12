
## Input
```javascript input
var notAGlobal = "123";
module.exports = "commonjs";
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
  "0-22-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const notAGlobal = "123";
module.exports = "commonjs";
```
