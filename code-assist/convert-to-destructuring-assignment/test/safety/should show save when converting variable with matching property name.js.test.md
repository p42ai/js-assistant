

## Input
```javascript input
let something = anObject.something;
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
  "3-34-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
let { something } = anObject;
```
