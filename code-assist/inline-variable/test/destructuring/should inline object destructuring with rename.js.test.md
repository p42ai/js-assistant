
## Input
```javascript input
const { aProperty: aVariable } = anObject;
doSomething(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
doSomething(anObject.aProperty);
```
