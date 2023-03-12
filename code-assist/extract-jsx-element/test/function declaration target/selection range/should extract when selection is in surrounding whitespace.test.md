
## Input
```javascript input
function f() {
    return (
        <div>text</div>
    );
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "30-52",
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
    return <div>text</div>;
}
function f() {
    return (
        <NewComponent />
    );
}
```
