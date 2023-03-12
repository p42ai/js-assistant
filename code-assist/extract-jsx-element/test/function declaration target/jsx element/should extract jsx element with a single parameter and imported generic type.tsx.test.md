
## Input
```javascript input
import { MyObject } from "./MyObject";

function f(a: MyObject<string>) {
    return <div>{a}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "85-99",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
import { MyObject } from "./MyObject";

function NewComponent({ a }: {
    a: MyObject<string>;
}) {
    return <div>{a}</div>;
}

function f(a: MyObject<string>) {
    return <NewComponent a={a} />;
}
```
