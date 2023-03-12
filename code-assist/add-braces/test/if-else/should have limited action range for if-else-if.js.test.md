## Input

```javascript input
if (conditionA) {
  doSomething1();
} else if (conditionB) doSomething2();
else {
  doSomething3();
}
```

## Configuration

```json configuration
{
  "extension": "js",
  "transformationId": "else"
}
```

## Expected Matches

```json expected matches
{
  "0-101-IfStatement": {
    "actionZones": [
      {
        "range": "38-42",
        "label": "Add {…} to else",
        "kind": "refactor.rewrite.toggle.braces.if-else.p42",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output

```javascript expected output
if (conditionA) {
  doSomething1();
} else {
  if (conditionB) doSomething2();
  else {
    doSomething3();
  }
}
```
