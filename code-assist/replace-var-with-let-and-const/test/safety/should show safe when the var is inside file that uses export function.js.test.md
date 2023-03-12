
## Input
```javascript input
var notAGlobalWhenThereAreExportDeclarations = "123";
export function f() {
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
  "0-52-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const notAGlobalWhenThereAreExportDeclarations = "123";
export function f() {
}
```
