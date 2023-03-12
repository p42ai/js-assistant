
Temporary solution. Should be better in the future.

## Input
```javascript input
import { MyObject } from "./MyObject";

function f(a: MyObject) {
    const x = a.b();
    return <div>{x}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "98-112",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Matches
```json expected matches
{
  "97-112-JsxElement": {
    "safety": {
      "level": "WARNING",
      "message": "some parameter types are unknown"
    }
  }
}
```

## Expected Output
```javascript expected output
import { MyObject } from "./MyObject";

function NewComponent({ x }: {
    x: unknown;
}) {
    return <div>{x}</div>;
}

function f(a: MyObject) {
    const x = a.b();
    return <NewComponent x={x} />;
}
```
