
## Input
```javascript input
const { propertyA, propertyB } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "8-8",
  "transformationId": "down"
}
```

## Expected Output
```javascript expected output
const { propertyB, propertyA } = anObject;
```
