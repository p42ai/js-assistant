
## Input
```javascript input
const { aProperty: aVariable = "aDefault" } = anObject;
doSomething(aVariable);
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
  "7-41-BindingElement": {
    "safety": {
      "level": "ERROR",
      "message": "removes default application"
    }
  }
}
```

## Expected Output
```javascript expected output
doSomething(anObject.aProperty);
```
