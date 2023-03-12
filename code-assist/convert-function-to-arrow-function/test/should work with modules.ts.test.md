
## Input
```javascript input
import Module from "@scope/module";

const f = function (context: Module) {
  console.log(context);
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
import Module from "@scope/module";

const f = (context: Module) => {
  console.log(context);
}
```
