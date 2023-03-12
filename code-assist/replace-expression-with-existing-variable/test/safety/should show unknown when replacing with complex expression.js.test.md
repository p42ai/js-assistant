
## Input
```javascript input
const aVariable = a + b;
doSomething(a + b);
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
  "37-42-BinaryExpression": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
const aVariable = a + b;
doSomething(aVariable);
```
