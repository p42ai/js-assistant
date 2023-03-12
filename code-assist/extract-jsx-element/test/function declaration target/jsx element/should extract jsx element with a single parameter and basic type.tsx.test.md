
## Input
```javascript input
function f(a: number) {
    return <div>{a}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "35-49",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent({ a }: {
    a: number;
}) {
    return <div>{a}</div>;
}
function f(a: number) {
    return <NewComponent a={a} />;
}
```
