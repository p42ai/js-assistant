
## Input
```javascript input
const test = require("a");
var notAGlobalWhenThereIsATopLevelRequire = "123";
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
  "26-76-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const test = require("a");
const notAGlobalWhenThereIsATopLevelRequire = "123";
```
