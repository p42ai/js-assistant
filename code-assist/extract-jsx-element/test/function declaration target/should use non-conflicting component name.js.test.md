
## Input
```javascript input
function NewComponent() {
    return <div>example</div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "37-55",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent2() {
    return <div>example</div>;
}
function NewComponent() {
    return <NewComponent2 />;
}
```
