
## Input
```javascript input
const { obj } = something;
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
  "39-55-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "removes export"
    }
  }
}
```

## Expected Output
```javascript expected output
const { obj: aVariable } = something;
```
