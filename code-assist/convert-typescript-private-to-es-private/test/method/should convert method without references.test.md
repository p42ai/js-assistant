
## Input
```javascript input
class C {
  private m() {
    doSomething();
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "9-48-MethodDeclaration": {
    "suggestion": {
      "description": "You can convert the private method 'm' to #-private.",
      "highlightRanges": ["12-21"]
    },
    "actionZones": [
      {
        "range": "12-21",
        "label": "Convert to #-private",
        "kind": "refactor.rewrite.typescript-private-to-es-private.p42",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
class C {
  #m() {
    doSomething();
  }
}
```
