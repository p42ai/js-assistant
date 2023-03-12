
## Input
```javascript input
doSomething();
/*
 * comment
 */
const { aProperty } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "41-41"
}
```

## Expected Output
```javascript expected output
doSomething();
/*
 * comment
 */
const aProperty = anObject.aProperty;
```
