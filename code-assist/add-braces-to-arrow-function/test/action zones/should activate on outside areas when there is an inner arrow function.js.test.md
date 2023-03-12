## Input

```javascript input
let a = () => () => "abc";
```

## Configuration

```json configuration
{
  "extension": "js",
  "selection": "8-8"
}
```

## Expected Matches

```json expected matches
{
  "7-25-ArrowFunction": {
    "actionZones": [
      {
        "range": "8-14",
        "label": "Add {…} to arrow function",
        "kind": "refactor.rewrite.toggle.braces.arrow-function.p42",
        "level": "quickFix"
      },
      {
        "range": "8-13",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output

```javascript expected output
let a = () => {
  return () => "abc";
};
```
