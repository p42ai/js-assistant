
## Input
```javascript input
const { aProperty1, aProperty2 } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-20"
}
```

## Expected Output
```javascript expected output
const { aProperty1, } = anObject;
const aProperty2 = anObject.aProperty2;
```
