
## Input
```javascript input
function f() {
    return <div>example</div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "26-44",
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
function f() {
    return <NewComponent />;
}
```
