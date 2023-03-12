
## Input
```javascript input
const { aProperty1, aProperty2: aVariable } = anObject;
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
const aVariable = anObject.aProperty2;
```
