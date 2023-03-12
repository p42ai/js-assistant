
## Input
```javascript input
export const obj = something;
export const aVariable = obj;
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
  "42-58-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "removes export"
    }
  }
}
```

## Expected Output
```javascript expected output
export const aVariable = something;
```
