
## Input
```javascript input
let aVariable = {
};
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
  "3-19-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "creates multiple objects"
    }
  }
}
```

## Expected Output
```javascript expected output
f({
});
f({
});
```
