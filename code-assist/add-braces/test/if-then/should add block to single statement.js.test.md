## Input

```javascript input
if (condition) doSomething();
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
  "0-29-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "actionZones": [
      {
        "range": "0-29",
        "label": "Add {…} to if",
        "kind": "refactor.rewrite.toggle.braces.if-then.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output

```javascript expected output
if (condition) {
  doSomething();
}
```
