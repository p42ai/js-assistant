
## Input
```javascript input
const [ obj ] = something;
const aVariable: string = obj;
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
  "32-56-VariableDeclaration": {
    "safety": {
      "level": "INFORMATION",
      "message": "removes type"
    }
  }
}
```

## Expected Output
```javascript expected output
const [ aVariable ] = something;
```
