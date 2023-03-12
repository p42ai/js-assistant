## Input

```javascript input
while (condition()) doSomething();
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Matches

```json expected matches
{
  "0-34-WhileStatement": {
    "actionZones": [
      {
        "range": "0-34",
        "label": "Add {…} to while",
        "kind": "refactor.rewrite.toggle.braces.while.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output

```javascript expected output
while (condition()) {
  doSomething();
}
```
