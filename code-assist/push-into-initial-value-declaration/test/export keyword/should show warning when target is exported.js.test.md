
## Input
```javascript input
export const obj = something;
const aVariable = obj;
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
  "35-51-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "changes export"
    }
  }
}
```

## Expected Output
```javascript expected output
export const aVariable = something;
```
