
## Input
```javascript input
const { aProperty: { innerProperty } } = anObject;
doSomething(innerProperty);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
doSomething(anObject.aProperty.innerProperty);
```
