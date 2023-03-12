

## Input
```javascript input
let something = anObject.somethingElse;
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
  "3-38-VariableDeclaration": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
let { somethingElse: something } = anObject;
```
