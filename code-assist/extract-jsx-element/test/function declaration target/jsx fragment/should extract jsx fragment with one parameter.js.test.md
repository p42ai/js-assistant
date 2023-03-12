
## Input
```javascript input
function f(x) {
    return <>
        <MyComponent param1={x} param2={"abc"} />
        <div>test</div>
    </>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "27-111",
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
    return <>
        <MyComponent param1={x} param2={"abc"} />
        <div>test</div>
    </>;
}
function f(x) {
    return <NewComponent x={x} />;
}
```
