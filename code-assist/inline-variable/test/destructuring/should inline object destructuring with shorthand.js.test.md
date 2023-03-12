
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

## Expected Output
```javascript expected output
doSomething(anObject.aProperty);
```
