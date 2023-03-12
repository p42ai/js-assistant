
## Input
```javascript input
const { aProperty, anotherProperty } = anObject;
doSomething(aProperty);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "8-8"
}
```

## Expected Output
```javascript expected output
const { anotherProperty } = anObject;
doSomething(anObject.aProperty);
```
