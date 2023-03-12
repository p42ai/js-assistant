
## Input
```javascript input
import { a } from "./a";
var notAGlobalWhenThereAreImportDeclarations = "123";
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
  "24-77-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
import { a } from "./a";
const notAGlobalWhenThereAreImportDeclarations = "123";
```
