
## Input
```javascript input
function f() {
    return <MyComponent param1={this.x} param2={"abc"} />;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "26-72",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Matches
```json expected matches
{
  "25-72-JsxSelfClosingElement": {
    "safety": {
      "level": "ERROR",
      "message": "contains reference to 'this'"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent() {
    return <MyComponent param1={this.x} param2={"abc"} />;
}
function f() {
    return <NewComponent />;
}
```
