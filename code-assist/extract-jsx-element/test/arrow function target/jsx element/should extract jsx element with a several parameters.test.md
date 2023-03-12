
## Input
```javascript input
function f(a) {
    const b = { b1: '123', b2: '456' };
    return <div>{a}-{b.b1}-{b.b2}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "67-95",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as arrow function"
    }
  }
}
```

## Expected Output
```javascript expected output
const NewComponent = ({ a, b }) => (<div>{a}-{b.b1}-{b.b2}</div>);
function f(a) {
    const b = { b1: '123', b2: '456' };
    return <NewComponent a={a} b={b} />;
}
```
