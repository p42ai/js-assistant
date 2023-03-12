
## Input
```javascript input
const f = () => <div>example</div>;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "16-34",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent() {
  return <div>example</div>;
}
const f = () => <NewComponent />;
```
