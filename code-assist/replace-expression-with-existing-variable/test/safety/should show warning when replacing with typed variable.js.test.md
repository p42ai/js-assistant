
## Input
```javascript input
const aVariable: string = "123";
doSomething("123");
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
  "45-50-StringLiteral": {
    "safety": {
      "level": "WARNING",
      "message": "could change type"
    }
  }
}
```

## Expected Output
```javascript expected output
const aVariable: string = "123";
doSomething(aVariable);
```
