
## Input
```javascript input
doSomething();
const { aProperty } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "23-23"
}
```

## Expected Output
```javascript expected output
doSomething();
const aProperty = anObject.aProperty;
```
