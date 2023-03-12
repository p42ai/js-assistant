
## Input
```javascript input
const { aProperty1, aProperty2: { innerValue } } = anObject;
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
const { innerValue } = anObject.aProperty2;
```
