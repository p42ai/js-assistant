
## Input
```javascript input
let aVariable = new Obj(1, 2, 3);
f(aVariable);
f(aVariable);
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
  "3-32-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "creates multiple objects"
    }
  }
}
```

## Expected Output
```javascript expected output
f(new Obj(1, 2, 3));
f(new Obj(1, 2, 3));
```
