
## Input
```javascript input
import { Component } from "./Component";

function f() {
    return <Component>example</Component>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "68-98",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
import { Component } from "./Component";

function NewComponent() {
    return <Component>example</Component>;
}

function f() {
    return <NewComponent />;
}
```
