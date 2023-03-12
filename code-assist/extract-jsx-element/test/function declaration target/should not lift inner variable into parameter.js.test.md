
## Input
```javascript input
function f(array) {
    return <div>{array.map((element) => <div>{element.title}</div>)}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "31-94",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent({ array }) {
    return <div>{array.map((element) => <div>{element.title}</div>)}</div>;
}
function f(array) {
    return <NewComponent array={array} />;
}
```
