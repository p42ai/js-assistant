
## Input
```javascript input
function f() {
    const c = "3";
    const a = "1";
    const b = "2";
    return <div>{c}-{a}-{b}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "83-105",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```javascript expected output
function NewComponent({ a, b, c }) {
    return <div>{c}-{a}-{b}</div>;
}
function f() {
    const c = "3";
    const a = "1";
    const b = "2";
    return <NewComponent a={a} b={b} c={c} />;
}
```
