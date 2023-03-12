
Temporary solution. Should be better in the future.

## Input
```javascript input
import { MyObject } from "./MyObject";

function f(a: MyObject) {
    const x = g(a);
    return <div>{x}</div>;
}

function g(a: MyObject) {
    return a.b;
}
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "97-111",
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
  "96-111-JsxElement": {
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
    const x = g(a);
    return <NewComponent x={x} />;
}

function g(a: MyObject) {
    return a.b;
}
```
