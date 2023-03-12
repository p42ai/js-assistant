
## Input
```javascript input
function f() {
    return <div> outer <div>inner</div></div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "38-54",
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
    return <div>inner</div>;
}
function f() {
    return <div> outer <NewComponent /></div>;
}
```
