
## Input
```javascript input
function f(x) {
    return <MyComponent param1={x} param2={"abc"} />;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "27-68",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent({ x }) {
    return <MyComponent param1={x} param2={"abc"} />;
}
function f(x) {
    return <NewComponent x={x} />;
}
```
