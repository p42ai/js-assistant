
## Input
```javascript input
var {
  firstPropertyAsPartOfDeepDestructuring: {
    propertyExtractedFromDeepDestructuring,
  },
} = objectToDeepDestructure;
console.log(propertyExtractedFromDeepDestructuring);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const {
  firstPropertyAsPartOfDeepDestructuring: {
    propertyExtractedFromDeepDestructuring,
  },
} = objectToDeepDestructure;
console.log(propertyExtractedFromDeepDestructuring);
```
