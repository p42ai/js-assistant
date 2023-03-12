
## Input
```javascript input
do doSomething(); while (condition);
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
  "0-36-DoStatement": {
    "actionZones": [
      {
        "range": "0-17",
        "label": "Add {…} to do",
        "kind": "refactor.rewrite.toggle.braces.do.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
do {
  doSomething();
} while (condition);
```
