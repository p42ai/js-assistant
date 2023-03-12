
## Input
```javascript input
function f(a) {
    return <div>{a}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "27-41",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent({ a }) {
    return <div>{a}</div>;
}
function f(a) {
    return <NewComponent a={a} />;
}
```
