
## Input
```javascript input
do {
  doSomething();
} while (condition);
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
  "0-42-DoStatement": {
    "actionZones": [
      {
        "range": "0-23",
        "label": "Remove {…} from do",
        "kind": "refactor.rewrite.toggle.braces.do.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
do doSomething(); while (condition);
```
