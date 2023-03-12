
## Input
```javascript input
function f(a: number) {
    return <div>{a}</div>;
}
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "35-49",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as arrow function"
    }
  }
}
```

## Expected Matches
```json expected matches
{
  "34-49-JsxElement": {
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["0-79", "115-137"]
      },
      {
        "type": "RENAME",
        "position": 6
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const NewComponent: React.FC<{
    a: number;
}> = ({ a }) => (<div>{a}</div>);
function f(a: number) {
    return <NewComponent a={a} />;
}
```
