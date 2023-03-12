
## Input
```javascript input
class C {
  #m() {
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
  "9-41-MethodDeclaration": {
    "actionZones": [
      {
        "range": "12-14",
        "label": "Convert to TypeScript-private",
        "kind": "refactor.rewrite.es-private-to-typescript-private.p42",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
class C {
  private m() {
    doSomething();
  }
}
```
