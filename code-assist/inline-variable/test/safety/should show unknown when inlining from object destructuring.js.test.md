
## Input
```javascript input
const { aProperty } = anObject;
doSomething(aProperty);
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
  "7-17-BindingElement": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
doSomething(anObject.aProperty);
```
