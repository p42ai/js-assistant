
## Input
```javascript input
function f() {
    return <div>test</div>;
}
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "26-41",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as arrow function"
    }
  }
}
```

## Expected Output
```javascript expected output
const NewComponent: React.FC = () => (<div>test</div>);
function f() {
    return <NewComponent />;
}
```
