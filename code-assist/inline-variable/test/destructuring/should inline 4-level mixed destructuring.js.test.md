
## Input
```javascript input
const { 
  aProperty: [ value1, [{ innerProperty }], value3, value4 ]
} = anObject;

doSomething(innerProperty);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "35-35"
}
```

## Expected Output
```javascript expected output
const { 
  aProperty: [ value1, , value3, value4 ]
} = anObject;

doSomething(anObject.aProperty[1][0].innerProperty);
```
