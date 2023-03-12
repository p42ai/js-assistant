
## Input
```javascript input
var [[propertyExtractedFromDeepDestructuring]] = arrayToDeepDestructure;
propertyExtractedFromDeepDestructuring = 10;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let [[propertyExtractedFromDeepDestructuring]] = arrayToDeepDestructure;
propertyExtractedFromDeepDestructuring = 10;
```
